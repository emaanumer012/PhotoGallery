const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const axios = require("axios")
const cors = require("cors")
const usageRoutes = require("./routes/usageRoutes")

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT || 3002

mongoose
    .connect(
        "mongodb+srv://emaanumer:1234@cluster0.j6to0c7.mongodb.net/photogallery-usage"
    )
    .then((result) => console.log("mongodb connected"))
    .catch((err) => console.log("mongodb not connected"))

// const handleEvent = async (type, data) => {
//     if (type === "UserCreated") {
//         console.log("User Created")
//         console.log(data)
//         await axios.post(`http://localhost:3001/users/${data}/storage`)
//     }
// }

const handleEvent = async (type, data) => {
    if (type === "StorageCreated") {
        console.log("Usage Created")
        console.log(data)
        await axios.post(`http://usagemntrserv-srv:3002/users/${data}/usage`)

        // type is 'ImageCreated' or 'ImageDeleted' for which same logic must be done.
    } else {
        try {
            console.log(data.userId)
            await axios.post(
                `http://usagemntrserv-srv:3002/users/${data.userId}/check-usage-time`
            )
            console.log(data)
            await axios.post(
                `http://usagemntrserv-srv:3002/users/${data.userId}/${data.fileSizeMB}/add-usage`
            )
        } catch (err) {
            console.log(err)
        }
    }
}

app.post("/events", (req, res) => {
    const { type, data } = req.body
    console.log("getting" + data.userId + " from event bus")
    handleEvent(type, data)
    res.send({})
})

app.use(usageRoutes)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

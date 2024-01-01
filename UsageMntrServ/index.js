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

app.use(usageRoutes)

const handleEvent = async (type, data) => {
    if (type === "StorageCreated") {
        await axios.post(`http://localhost:3002/users/${data}/usage`)

        // type is 'ImageCreated' or 'ImageDeleted' for which same logic must be done.
    } else if (type === "ImageAdded" || type === "ImageDeleted") {
        try {
            // await axios.post(
            //     `http://localhost:3002/users/${data.userId}/check-usage-time`
            // )

            await axios.post(
                `http://localhost:3002/users/${data.userId}/${data.fileSizeMB}/add-usage`
            )
        } catch (err) {
            console.log(err)
        }
    }
}

app.post("/events", (req, res) => {
    const { type, data } = req.body
    handleEvent(type, data)
    res.send({})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

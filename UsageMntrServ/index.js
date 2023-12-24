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

app.post("/events", (req, res) => {
    // const { type, data } = req.body
    // handleEvent(type, data)
    // res.send({})
})

app.use(usageRoutes)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

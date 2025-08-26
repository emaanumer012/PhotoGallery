const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const events = []

app.post("/events", async (req, res) => {
    const event = req.body

    events.push(event)

    await axios.post("http://localhost:3006/events", event).catch((err) => {
        console.log(err.message)
    })
    await axios.post("http://localhost:3001/events", event).catch((err) => {
        console.log(err.message)
    })
    await axios.post("http://localhost:3002/events", event).catch((err) => {
        console.log(err.message)
    })
    await axios.post("http://localhost:3009/events", event).catch((err) => {
        console.log(err.message)
    })
    res.send({ status: "OK" })
})

app.get("/events", (req, res) => {
    res.send(events)
})
app.listen(3003, () => {
    console.log("Listening on 3003")
})

const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const app = express()
app.use(bodyParser.json())

const events = []

app.post("/events", (req, res) => {
    const event = req.body

    events.push(event)

    axios.post("http://localhost:3000/events", event).catch((err) => {
        console.log(err.message)
    })
    axios.post("http://localhost:3001/events", event).catch((err) => {
        console.log(err.message)
    })
    axios.post("http://localhost:3002/events", event).catch((err) => {
        console.log(err.message)
    })
    axios.post("http://localhost:3009/events", event).catch((err) => {
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

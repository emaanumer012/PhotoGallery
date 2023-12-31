const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const fs = require("fs")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/events", (req, res) => {
    const { type, data } = req.body
    if (type === "UserCreated") {
        const filePath = path.join("logs", `${data}.json`)

        const JSONdata = { userId: data, timestamp: Date.now(), logs: [] }
        const jsonString = JSON.stringify(JSONdata, null, 2)

        fs.writeFileSync(filePath, jsonString)

        console.log(`Data written to ${filePath}`)
    }
    if (type === "ImageAdded") {
        const filePath = path.join("logs", `${data.userId}.json`)

        try {
            const existingData = fs.readFileSync(filePath, "utf-8")
            const existingJson = JSON.parse(existingData)

            // Update the logs array with information about the added image
            const imageAddedLog = {
                event: "User just added an image",
                timestamp: Date.now(),
            }

            existingJson.logs.push(imageAddedLog)

            // Write the updated JSON back to the file
            fs.writeFileSync(filePath, JSON.stringify(existingJson, null, 2))

            console.log(`ImageAdded event logged for user ${data.userId}`)
        } catch (error) {
            console.error(
                `Error updating logs for user ${data.userId}: ${error.message}`
            )
        }
    }
    if (type === "ImageDeleted") {
        const filePath = path.join("logs", `${data.userId}.json`)

        try {
            // Read existing JSON file
            const existingData = fs.readFileSync(filePath, "utf-8")
            const existingJson = JSON.parse(existingData)

            // Update the logs array with information about the added image
            const imageAddedLog = {
                event: "User just deleted an image",
                timestamp: Date.now(),
            }

            existingJson.logs.push(imageAddedLog)

            // Write the updated JSON back to the file
            fs.writeFileSync(filePath, JSON.stringify(existingJson, null, 2))

            console.log(`ImageDeleted event logged for user ${data.userId}`)
        } catch (error) {
            console.error(
                `Error updating logs for user ${data.userId}: ${error.message}`
            )
        }
    }
})

app.listen(3009, () => {
    console.log("Listening on 3009")
})

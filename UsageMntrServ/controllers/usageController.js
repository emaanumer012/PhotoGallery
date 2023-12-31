const Usage = require("../models/Usage")
const axios = require("axios")
const handleErrors = (err) => {}
const LIMIT = 25

// get usage for a current user
module.exports.checkusage_get = async (req, res) => {
    const id = req.params.id
    try {
        const curr_usage = await Usage.retrieveUsageDetails(id)
        await axios.post(`http://usagemntrserv-srv:3002/users/${id}/check-usage-time`)
        res.status(200).json(curr_usage.currUsedLimit)
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
}

// create usage in database for new user
module.exports.checkusage_post = async (req, res) => {
    const id = req.params.id
    const usage_space = await Usage.create({
        userId: id,
        currUsedLimit: 0,
        resetDate: new Date(),
    })
    res.status(200).json(usage_space)
}

// add usage as user uploads and deletes
module.exports.addusage_post = async (req, res) => {
    const id = req.params.userId
    console.log(id + " in addusage.post")
    const fileSize = parseFloat(req.params.fileSizeMB)
    const curr_usage = await Usage.retrieveUsageDetails(id)
    if (curr_usage.currUsedLimit + fileSize <= LIMIT) {
        curr_usage.currUsedLimit += fileSize
        console.log(curr_usage.currUsedLimit)
        await curr_usage.save()

        res.status(200).json({
            success: true,
            message: "Usage updated successfully",
            alertType: "normal",
            alertMessage: "",
        })
    } else {
        curr_usage.currUsedLimit = LIMIT
        await curr_usage.save()
        console.log("daily usage gone")
        // await axios.post(
        //     `http://localhost:3001/${"limit"}/${"You've reached your limit for today. Come back tomorrow!"}/alerts`
        // )
        res.status(400).json({
            success: false,
            error: "Daily Usage Exceeded",
        })
    }
}

// clear usage after 24 hours
module.exports.checkusagetime_post = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        // Retrieve usage details for the user
        const curr_usage = await Usage.retrieveUsageDetails(id)

        // Check if it's time to reset usage (assuming resetDate is a string representing the last reset date)
        const lastResetDate = new Date(curr_usage.resetDate)
        const currentDate = new Date()

        // Check if 24 hours have passed since the last reset
        if (currentDate - lastResetDate >= 24 * 60 * 60 * 1000) {
            // Reset currUsedLimit to 0 and update resetDate
            curr_usage.currUsedLimit = 0
            curr_usage.resetDate = currentDate.toISOString() // Update resetDate to the current date

            // Save the updated usage details in the database
            await curr_usage.save()

            res.status(200).json({
                success: true,
                message: "Usage reset successfully",
            })
        } else {
            res.status(200).json({
                success: true,
                message: "Not yet time to reset usage",
            })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
}

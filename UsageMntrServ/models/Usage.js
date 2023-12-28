const mongoose = require("mongoose")

const usageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    currUsedLimit: {
        type: Number,
        min: 0,
        set: (value) => parseFloat(value.toFixed(2)),
    },
    resetDate: String,
})

// find storage details based on id
usageSchema.statics.retrieveUsageDetails = async function (userId) {
    console.log(userId)
    stringId = String(userId)
    const usage = await this.findOne({ userId: stringId })
    console.log(usage)
    if (usage) {
        return usage
    }
    throw Error("No user with this usage")
}

const Usage = mongoose.model("usage", usageSchema)
module.exports = Usage

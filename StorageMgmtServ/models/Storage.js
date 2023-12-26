const mongoose = require("mongoose")

const storageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    spaceOccupied: {
        type: Number,
        min: 0,
    },
    images: {
        type: [],
    },
})

// find storage details based on id
storageSchema.statics.retrieve = async function (userId) {
    const storage = await this.findOne({ userId })
    if (storage) {
        return storage
    }
    throw Error("No user with this storage")
}

const Storage = mongoose.model("storage", storageSchema)
module.exports = Storage

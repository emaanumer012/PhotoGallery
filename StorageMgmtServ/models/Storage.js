const mongoose = require("mongoose")

const storageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    spaceOccupied: {
        type: Number,
        min: 0,
        set: (value) => parseFloat(value.toFixed(2)),
    },
    images: {
        type: [],
    },
})

// find storage details based on id
storageSchema.statics.retrieveUserDetails = async function (userId) {
    const storage = await this.findOne({ userId })
    if (storage) {
        return storage
    }
    throw Error("No user with this storage")
}

// find image array number based on id and URL
storageSchema.statics.retrieveImageArray = async function (userId, imageURL) {
    const storage = await this.findOne({ userId })
    if (storage) {
        // Find the index of the object in the images array based on imageURL
        const index = storage.images.findIndex(
            (image) => image.imageURL === imageURL
        )

        // If the object is found, return the index; otherwise, return -1 or handle it accordingly
        if (index !== -1) {
            return index
        }

        throw Error("Image not found in the user's storage")
    }

    throw Error("No user with this storage")
}

const Storage = mongoose.model("storage", storageSchema)
module.exports = Storage

const Storage = require("../models/Storage")

const handleErrors = (err) => {}

// get storage for a current user based on id
module.exports.checkstorage_get = async (req, res) => {
    const id = req.params.id
    try {
        const storage = await Storage.retrieve(id)
        res.status(200).json(storage)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// create storage for a new user based on id
module.exports.checkstorage_post = async (req, res) => {
    const id = req.params.id
    const storage = await Storage.create({
        userId: id,
        spaceOccupied: 0,
    })
    res.status(200).json(storage)
}

// add image for a current user
module.exports.addimage_post = async (req, res) => {}

// remove image for a current user
module.exports.deleteimage_post = async (req, res) => {}

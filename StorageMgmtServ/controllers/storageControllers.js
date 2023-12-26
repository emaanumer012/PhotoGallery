const storage = require("../models/Storage")
const { uploadtoBucket } = require("../services/storageService")
const Multer = require("multer")
const uuid = require("uuid")
const uuidv1 = uuid.v1
const { Storage } = require("@google-cloud/storage")

const bucket_storage = new Storage({
    keyFilename: `./emaan-project-2-409215-3a709ceb2d20.json`,
})

const bucketName = "dataset-emaan-bucket"
const bucket = bucket_storage.bucket(bucketName)
const multer = Multer({
    bucket_storage: Multer.memoryStorage(),
})

const handleErrors = (err) => {}
let curr_user = {}

// get storage for a current user based on id
module.exports.checkstorage_get = async (req, res) => {
    const id = req.params.id
    try {
        curr_user = await storage.retrieve(id)
        res.status(200).json(curr_user)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

// create storage for a new user based on id
module.exports.checkstorage_post = async (req, res) => {
    const id = req.params.id
    const storage_space = await storage.create({
        userId: id,
        spaceOccupied: 0,
        images: [],
    })
    res.status(200).json(storage_space)
}

// add image for a current user
module.exports.addimage_post = async (req, res) => {
    const userId = req.body.id
    const fileSize = req.body.size

    try {
        if (curr_user.spaceOccupied + fileSize / (1024 * 1024) < 10) {
            const originalName = req.file.originalname
            const fileName = uuidv1() + "-" + originalName
            const blob = bucket.file(`${userId}/${fileName}`)
            const blobStream = blob.createWriteStream()

            blobStream.on("error", (err) => {
                console.log(err)
                res.status(500).json({
                    success: false,
                    error: "Error uploading image to bucket",
                })
            })

            blobStream.on("finish", async () => {
                const imageURL = `https://storage.googleapis.com/${bucketName}/${userId}/${blob.name}`

                // Update the user's document in the database
                try {
                    curr_user.images.push({ originalName, imageURL })
                    curr_user.spaceOccupied += fileSize / (1024 * 1024)

                    // Save the updated user document to the database
                    await storage.findOneAndUpdate(
                        { userId: curr_user.userId },
                        {
                            $set: {
                                images: curr_user.images,
                                spaceOccupied: curr_user.spaceOccupied,
                            },
                        },
                        { new: true }
                    )

                    console.log("Image uploaded to bucket:", imageURL)
                    res.status(200).json({ success: true, imageURL })
                } catch (err) {
                    console.error("Error updating user document:", err)
                    res.status(500).json({
                        success: false,
                        error: "Error updating user document",
                    })
                }
            })

            blobStream.end(req.file.buffer)
        } else {
            console.log("Space exceeded")
            res.status(400).json({ success: false, error: "Space exceeded" })
        }
    } catch (err) {
        console.error("Error uploading image:", err)
        res.status(500).json({ success: false, error: "Error uploading image" })
    }
}

// remove image for a current user
module.exports.deleteimage_post = async (req, res) => {}

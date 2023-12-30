const storage = require("../models/Storage")
const Multer = require("multer")
const uuid = require("uuid")
const uuidv1 = uuid.v1
const axios = require("axios")
const { Storage } = require("@google-cloud/storage")
const STORAGE_LIMIT = 10
const bucket_storage = new Storage({
    keyFilename: `./emaan-project-2-409215-3a709ceb2d20.json`,
})

const bucketName = "gallery-storage-bucket"
const bucket = bucket_storage.bucket(bucketName)
const multer = Multer({
    bucket_storage: Multer.memoryStorage(),
})
let curr_user = {}
module.exports.checkstorage_get = async (req, res) => {
    // get userid from params
    const id = req.params.id

    //find user from database
    try {
        const curr_storage = await storage.retrieveUserDetails(id)
        res.status(200).json(curr_storage.spaceOccupied)
    } catch (err) {
        // send back error that says no user with this space exists
        res.status(500).json({ success: false, error: err.message })
    }
}

module.exports.getimages_get = async (req, res) => {
    const options = {
        version: "v4",
        action: "read",
        expires: Date.now() + 15 * 60 * 1000, // Timestamp (in milliseconds) when the URL expires
    }
    const id = req.params.id
    try {
        curr_user = await storage.retrieveUserDetails(id)

        // Array to store signed URLs for each image
        const signedUrls = []

        // Loop through each image and generate signed URL
        for (const image of curr_user.images) {
            const [url] = await bucket_storage
                .bucket(bucketName)
                .file(image.imageURL)
                .getSignedUrl(options)

            signedUrls.push({
                fileName: image.originalName,
                originalUrl: image.imageURL,
                signedUrl: url,
            })
        }
        res.status(200).json(signedUrls)
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
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
    await axios.post("http://localhost:3003/events", {
        type: "StorageCreated",
        data: id,
    })
    res.status(200).json(storage_space)
}

// add image for a current user
module.exports.addimage_post = async (req, res) => {
    const userId = req.body.id
    const fileSizeMB = req.body.size / (1024 * 1024)
    try {
        if (curr_user.spaceOccupied + fileSizeMB <= STORAGE_LIMIT) {
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
                const imageURL = `${blob.name}`

                // Update the user's document in the database
                try {
                    curr_user.images.push({
                        originalName,
                        imageURL,
                        fileSizeMB,
                    })
                    curr_user.spaceOccupied += fileSizeMB

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
                    await axios.post("http://localhost:3003/events", {
                        type: "ImageAdded",
                        data: { userId, fileSizeMB },
                    })

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
            console.log("Not enough space left")
            res.status(400).json({ success: false, error: "Space exceeded" })
        }
    } catch (err) {
        console.error("Error uploading image:", err)
        res.status(500).json({ success: false, error: "Error uploading image" })
    }
}

// remove image for a current user
module.exports.deleteimage_post = async (req, res) => {
    const userId = req.body.id
    const filePath = req.body.originalUrl

    try {
        const user = await storage.retrieveUserDetails(userId)

        // Find the index of the image in the user's images array
        const imageIndex = user.images.findIndex(
            (image) => image.imageURL === filePath
        )

        if (imageIndex !== -1) {
            // Get the size of the image to be deleted
            const fileSizeMB = user.images[imageIndex].fileSizeMB

            // Remove the image from the images array
            user.images.splice(imageIndex, 1)

            // Update the space occupied
            user.spaceOccupied -= fileSizeMB

            // Save the updated user document to the database
            await storage.findOneAndUpdate(
                { userId: user.userId },
                {
                    $set: {
                        images: user.images,
                        spaceOccupied: user.spaceOccupied,
                    },
                },
                { new: true }
            )

            // Delete the file from the storage bucket
            const file = bucket.file(filePath)
            const exists = await file.exists()

            if (exists[0]) {
                await file.delete()
                console.log("File deleted successfully.")
                await axios.post("http://localhost:3003/events", {
                    type: "ImageDeleted",
                    data: { userId, fileSizeMB },
                })
            } else {
                console.log("File does not exist.")
            }

            res.status(200).json({ success: true })
        } else {
            res.status(404).json({ success: false, error: "Image not found" })
        }
    } catch (error) {
        console.error("Error deleting image:", error)
        res.status(500).json({ success: false, error: "Internal server error" })
    }
}

// module.exports.alerts_post = async (req, res) => {
//     const type = req.params.type
//     const message = req.params.message
//     alerts = { type: type, message: message }
//     console.log(alerts)
// }
// module.exports.alerts_get = async (req, res) => {
//     console.log("sending limit alert back")
//     res.status(200).json(alerts)
// }

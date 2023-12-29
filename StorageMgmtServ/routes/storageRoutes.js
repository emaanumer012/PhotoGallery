const { Router } = require("express")
const router = Router()
const storageController = require("../controllers/storageControllers")
const multer = require("multer")

const storage = multer.memoryStorage()
const multerUpload = multer({ storage: storage })

//params will contain id of the specific user. This endpoint is used to get the current storage used from the database
router.get("/users/:id/storage", storageController.checkstorage_get)

// params contain id of the specific user. This endpoint will send back {fileName  (to display image name), originalURL, and signedURL (to show image)
router.get("/users/:id/get-images", storageController.getimages_get)

// params will contain id of the specific user. Returns the whole record details of the user from mongodb Storage (id, space, and images)
router.post("/users/:id/storage", storageController.checkstorage_post)

// add an image to GCP bucket. Upload single image at a time. Will send back success and failure status with message
router.post(
    "/add-image",
    multerUpload.single("image"),
    storageController.addimage_post
)
router.post("/delete-image", storageController.deleteimage_post)
// router.get("/alerts", storageController.alerts_post)
// router.post("/:type/:message/alerts", storageController.alerts_post)

module.exports = router

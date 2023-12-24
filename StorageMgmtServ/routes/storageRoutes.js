const { Router } = require("express")
const router = Router()
const storageController = require("../controllers/storageControllers")

router.get("/users/:id/storage", storageController.checkstorage_get)
router.post("/users/:id/storage", storageController.checkstorage_post)
router.post("/users/:id/add-image", storageController.addimage_post)
router.post("/users/:id/delete-image", storageController.deleteimage_post)

module.exports = router

const { Router } = require("express")
const router = Router()
const usageController = require("../controllers/usageController")

router.get("/users/:id/usage", usageController.checkusage_get)
router.post("/users/:id/usage", usageController.checkusage_post)
router.post(
    "/users/:userId/:fileSizeMB/add-usage",
    usageController.addusage_post
)
router.post("/users/:id/check-usage-time", usageController.checkusagetime_post)

module.exports = router

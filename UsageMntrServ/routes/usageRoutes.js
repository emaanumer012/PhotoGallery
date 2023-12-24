const { Router } = require("express")
const router = Router()
const usageController = require("../controllers/usageControllers")

router.get("/users/:id/usage", usageController.checkusage_get)
router.post("/users/:id/usage", usageController.checkusage_post)
router.post("/users/:id/add-usage", usageController.addusage_post)
router.post("/users/:id/clear-usage", usageController.clearusage_post)

module.exports = router

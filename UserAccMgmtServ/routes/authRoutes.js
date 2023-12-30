const { Router } = require("express")
const router = Router()
const authController = require("../controllers/authController")
const middleware = require("../middleware/authMiddleware")

router.post("/signup", authController.signup_post)
router.post("/login", authController.login_post)
// router.get("/logout", authController.logout_get)
router.get("/user", authController.user_get)

module.exports = router

const { Router } = require("express")
const router = Router()
const authController = require("../controllers/authController")

router.post("/signup", authController.signup_post)
router.post("/login", authController.login_post)
router.get("/logout", authController.logout_get)
router.get("/users/:email", authController.user_get)

module.exports = router

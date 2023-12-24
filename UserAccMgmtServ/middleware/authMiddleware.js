const jwt = require("jsonwebtoken")

const requireAuth = (req, res, next) => {
    // get the cookie
    const token = req.cookies.jwt

    // check json web token exists and is verified
    if (token) {
        jwt.verify(token, "cloud computing", (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect("/login")
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect("/login")
    }
}

//check user
const checkUser = (req, res, next) => {
    const token = res.cookies.jwt
    if (token) {
        jwt.verify(token, "cloud computing", async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = { requireAuth, checkUser }

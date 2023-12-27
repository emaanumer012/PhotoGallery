const jwt = require("jsonwebtoken")

const verify = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, "cloud computing", (err, decoded) => {
            if (err) {
                return res.status(403).json("Token is not valid!")
            }
            req.tokenData = decoded
            next()
        })
    } else {
        res.status(401).json("You are not authenticated")
    }
}

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

module.exports = { requireAuth, checkUser, verify }

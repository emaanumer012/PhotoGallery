const User = require("../models/User")
const jwt = require("jsonwebtoken")

const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: "", password: "" }

    //incorrect email
    if (err.message === "No user with this email exists") {
        errors.email = err.message
    }

    if (err.message === "Password is incorrect") {
        errors.password = err.message
    }

    //duplicate key error handling
    if (err.code === 11000) {
        errors.email = "An account with this email already exists"
    }

    //validation
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, "cloud computing", {
        expiresIn: maxAge,
    })
}

module.exports.signup_get = (req, res) => {
    res.send({ name: "Ayesha", email: "Ayesha@gmail.com", password: "123" })
}

module.exports.login_get = (req, res) => {
    res.send("data from login_get")
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json(user)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json(errors)
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(200).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        console.log(errors)
        res.status(400).json(errors)
    }
}

module.exports.logout_get = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.redirect("/login")
}

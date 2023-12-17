const User = require("../models/User")

const handleErrors = (err) => {
    console.log(err.message, err.code)

    //duplicate key error handling
    if (err.code === 1100) {
        errors.email = "An account with this email already exists"
    }

    //validation
    let errors = { email: "", password: "" }
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
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
        const user = await User.create({ name, email, password })
        res.status(201).json(user)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json(errors)
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    res.send("data from login_post")
    console.log("Login successful with email", email)
}

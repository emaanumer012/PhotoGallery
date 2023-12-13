const User = require("../models/User")

module.exports.signup_get = (req, res) => {
    res.send({ email: "Ayesha@gmail.com", password: "123" })
}

module.exports.login_get = (req, res) => {
    res.send("data from login_get")
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password })
        res.status(201).json(user)
    } catch (err) {
        console.log(err)
        res.status(400).send("user couldn't be created")
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body
    res.send("data from login_post")
}

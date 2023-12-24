const User = require("../models/User")
const jwt = require("jsonwebtoken")
const axios = require("axios")

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

// create a user
module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        const token = createToken(user._id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 })
        await axios.post("http://localhost:3003/events", {
            type: "UserCreated",
            data: user._id,
        })

        res.status(201).json(user)
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json(errors)
    }
}

// login a user
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

// logout a user   Problem: Giving axios network error
module.exports.logout_get = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 })
    res.redirect("/login")
}

// find a user by their email and returns all user data, including id.
module.exports.user_get = async (req, res) => {
    const userEmail = req.params.email

    try {
        // Fetch a specific user from MongoDB using the email
        const user = await User.findOne(
            { email: userEmail },
            "name email password"
        )

        if (!user) {
            // If the user with the given email is not found, return a 404 response
            return res.status(404).json({ error: "User not found" })
        }

        // Format the data
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
        }

        res.status(200).json(userData)
    } catch (error) {
        console.error("Error fetching user:", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

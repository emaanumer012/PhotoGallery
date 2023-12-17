const mongoose = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [6, "Password must be at least 6 characters"],
    },
})

// function fires before document saved to the database
userSchema.pre("save", async function (next) {
    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)
    }
})

// function fires after document saved to the database
// userSchema.post("save", function (doc, next) {
//     console.log("new user was created and saved", doc)
//     next() //done after every mongoose hook
// })

const User = mongoose.model("user", userSchema)
module.exports = User

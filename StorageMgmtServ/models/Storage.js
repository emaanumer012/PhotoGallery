const mongoose = require("mongoose")

const storageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    spaceOccupied: {
        type: Number,
        min: 0,
    },
})

// // function fires before document saved to the database
// storageSchema.pre("save", async function (next) {
//     try {
//         const salt = await bcrypt.genSalt()
//         this.password = await bcrypt.hash(this.password, salt)
//         next()
//     } catch (error) {
//         next(error)
//     }
// })

// function fires after document saved to the database
// userSchema.post("save", function (doc, next) {
//     console.log("new user was created and saved", doc)
//     next() //done after every mongoose hook
// })

// //static method
// storageSchema.statics.login = async function (email, password) {
//     const user = await this.findOne({ email })
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password)
//         if (auth) {
//             return user
//         }
//         throw Error("Password is incorrect")
//     }
//     throw Error("No user with this email exists")
// }

// find storage details based on id
storageSchema.statics.retrieve = async function (userId) {
    const storage = await this.findOne({ userId })
    if (storage) {
        return storage
    }
    throw Error("No user with this storage")
}

const Storage = mongoose.model("storage", storageSchema)
module.exports = Storage

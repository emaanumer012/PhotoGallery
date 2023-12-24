const mongoose = require("mongoose")

const usageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
    },
    currLimit: {
        type: Number,
        min: 0,
    },
})

// // function fires before document saved to the database
// userSchema.pre("save", async function (next) {
//     try {
//         const salt = await bcrypt.genSalt()
//         this.password = await bcrypt.hash(this.password, salt)
//         next()
//     } catch (error) {
//         next(error)
//     }
// })

// // function fires after document saved to the database
// // userSchema.post("save", function (doc, next) {
// //     console.log("new user was created and saved", doc)
// //     next() //done after every mongoose hook
// // })

// //static method
// usageSchema.statics.login = async function (email, password) {
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

const Usage = mongoose.model("usage", usageSchema)
module.exports = Usage

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
app.use(cors())
app.use(cookieParser())

mongoose
    .connect(
        "mongodb+srv://emaanumer:1234@cluster0.j6to0c7.mongodb.net/photogallery"
    )
    .then((result) => console.log("mongodb connected"))
    .catch((err) => console.log("mongodb not connected"))

app.get("/set-cookies", (req, res) => {
    res.cookie("newUser", false, { maxAge: 1000 * 60 * 60 * 24 })

    res.send("you got em cookies")
})

app.get("/read-cookies", (req, res) => {
    const cookies = req.cookies
    console.log(cookies)
    res.json(cookies)
})

// app.get("/login", (req, res) => {})
app.use(authRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

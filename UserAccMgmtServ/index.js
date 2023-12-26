const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const authRoutes = require("./routes/authRoutes")

// const { checkUser } = require("./middleware/authMiddleware")
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

// app.set("*", checkUser)

// app.get("/login", (req, res) => {})
app.use(authRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// getting express
const express = require("express")
const cors = require("cors")

// creating the app with all that express provides
const app = express()

app.use(express.json())
app.use(cors())

app.get("/adduser", (req, res) => {
    console.log(req.body)
    res.send("Response recieved" + req.body)
})

app.listen(4000, () => console.log("Server on localhost"))
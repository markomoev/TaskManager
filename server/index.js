const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./database");

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTE IMPORTS
const authRoutes = require("./routes/auth");

// ROUTE USE
app.use("/auth", authRoutes); 

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
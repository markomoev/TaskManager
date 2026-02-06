const router = require("express").Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER ROUTE
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, firstName, lastName } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length > 0) {
            return res.status(401).json("User already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (username, email, password_hash, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, email, bcryptPassword, firstName, lastName]
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET || "secret_key", {
            expiresIn: "1h",
        });

        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
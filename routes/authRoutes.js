const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    res.send("register router");
});

router.post("/login", (req, res) => {
    res.send("login route");
});

module.exports = router;
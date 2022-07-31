const express = require("express");

const { tokenVerfication, login, register, logout } = require("../controllers/auth.js");
const { validateToken } = require("../middlewares/auth.js");

const router = express.Router();

router.get("/auth", validateToken, tokenVerfication)

router.post("/register", register)

router.post("/login", login)

router.post("/logout", logout)

module.exports = router;
const express = require("express");

const { showCurrentUser, updateCurrentUser } = require("../controllers/user.js");
const { validateToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/profile", validateToken, showCurrentUser)

router.put("/profile/:id", validateToken, updateCurrentUser)

module.exports = router;
const express = require("express");

const { showLogs, createLog } = require("../controllers/log.js");
const { validateToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/logs", showLogs)

router.post("/log", validateToken, createLog);

module.exports = router;
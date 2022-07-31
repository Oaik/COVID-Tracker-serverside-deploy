const express = require("express");

const { showDashboard } = require("../controllers/dashboard.js");

const router = express.Router();

router.get("/", showDashboard)

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  getRecruiterDashboard,
} = require("../controllers/recruiterDashboardController");

router.get("/dashboard", getRecruiterDashboard);

module.exports = router;
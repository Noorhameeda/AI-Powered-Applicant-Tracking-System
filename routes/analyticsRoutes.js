const express = require("express");
const router = express.Router();

const {
getRecruiterAnalytics,
getJobAnalytics,
getCandidateAnalytics,
} = require("../controllers/analyticsController");

router.get("/recruiter", getRecruiterAnalytics);

router.get("/jobs/:id", getJobAnalytics);

router.get("/candidates", getCandidateAnalytics);

module.exports = router;

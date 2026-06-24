const express = require("express");

const {
  getCandidateRanking,
  getAdminDashboard,
  getApplicantDashboard,
  getChartsData,
  getActivityAnalytics,
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/ranking", getCandidateRanking);

router.get("/dashboard/admin", getAdminDashboard);

router.get("/dashboard/applicant", getApplicantDashboard);

router.get("/charts", getChartsData);

router.get("/activity", getActivityAnalytics);

module.exports = router;
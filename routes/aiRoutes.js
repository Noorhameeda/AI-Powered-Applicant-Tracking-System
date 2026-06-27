const express = require("express");
const router = express.Router();

const {
  analyzeApplication,
  getRankings,
  getApplicationAnalysis,
} = require("../controllers/aiController");

router.post("/analyze", analyzeApplication);

router.get("/rankings", getRankings);

router.get("/report/:applicationId", getApplicationAnalysis);

module.exports = router;

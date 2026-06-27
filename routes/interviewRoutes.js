const express = require("express");
const router = express.Router();

const {
  scheduleInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
} = require("../controllers/interviewController");

router.post("/schedule", scheduleInterview);
router.get("/", getInterviews);
router.put("/:id", updateInterview);
router.delete("/:id", deleteInterview);

module.exports = router;
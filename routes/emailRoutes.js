const express = require("express");
const {
  sendInterviewEmail,
  sendRejectEmail,
  sendShortlistEmail,
} = require("../controllers/emailController");

const router = express.Router();

router.post("/interview", sendInterviewEmail);
router.post("/reject", sendRejectEmail);
router.post("/shortlist", sendShortlistEmail);

module.exports = router;

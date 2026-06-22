const express = require("express");
const router = express.Router();

const {
  getCandidateRanking,
} = require("../controllers/rankingController");

router.get("/", getCandidateRanking);

module.exports = router;
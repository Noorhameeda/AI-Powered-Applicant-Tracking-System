const express = require("express");
const router = express.Router();

const {
  searchJobs,
  filterJobs,
} = require("../controllers/searchController");

// Search Jobs
router.get("/search", searchJobs);

// Filter Jobs
router.get("/filter", filterJobs);

module.exports = router;
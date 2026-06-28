const express = require("express");

const {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} = require("../controllers/jobController");

const {
  searchJobs,
  filterJobs,
} = require("../controllers/searchController");

const { protect } = require("../middlewares/authMiddleware");
const { isRecruiter } = require("../middlewares/roleMiddleware");

const router = express.Router();

// CREATE JOB
router.post("/create", protect, isRecruiter, createJob);

// GET ALL JOBS
router.get("/", getJobs);

// SEARCH & FILTER (must be before /:id)
router.get("/search", searchJobs);
router.get("/filter", filterJobs);

// GET SINGLE JOB
router.get("/:id", getJobById);

// UPDATE JOB
router.put("/:id", protect, isRecruiter, updateJob);

// DELETE JOB
router.delete("/:id", protect, isRecruiter, deleteJob);

module.exports = router;
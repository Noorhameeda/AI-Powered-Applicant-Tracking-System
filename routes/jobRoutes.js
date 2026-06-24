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

router.post("/create", protect, isRecruiter(), createJob);

router.get("/", getJobs);

// SEARCH ROUTES MUST COME BEFORE :id
router.get("/search", searchJobs);
router.get("/filter", filterJobs);

router.get("/:id", getJobById);

router.put("/:id", protect, isRecruiter(), updateJob);

router.delete("/:id", protect, isRecruiter(), deleteJob);

module.exports = router;
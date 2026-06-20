const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const {
  isRecruiter,
} = require("../middleware/roleMiddleware");

// Create Job
router.post(
  "/create",
  protect,
  isRecruiter,
  createJob
);

// Get All Jobs
router.get("/", getJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.put(
  "/:id",
  protect,
  isRecruiter,
  updateJob
);

// Delete Job
router.delete(
  "/:id",
  protect,
  isRecruiter,
  deleteJob
);

module.exports = router;
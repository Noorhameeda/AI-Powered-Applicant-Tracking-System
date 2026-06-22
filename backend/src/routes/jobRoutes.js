const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  searchJobs,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const { isRecruiter } = require("../middleware/roleMiddleware");

/* CREATE */
router.post("/create", protect, isRecruiter, createJob);

/* GET ALL */
router.get("/", getJobs);

/* SEARCH (MUST BE ABOVE :id) */
router.get("/search", searchJobs);

/* GET BY ID */
router.get("/:id", getJobById);

/* UPDATE */
router.put("/:id", protect, isRecruiter, updateJob);

/* DELETE */
router.delete("/:id", protect, isRecruiter, deleteJob);

module.exports = router;
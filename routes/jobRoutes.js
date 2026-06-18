const express = require("express");
const {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} = require("../controllers/jobController");
const { protect } = require("../middlewares/authMiddleware");
const { isRecruiter } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/create", protect, isRecruiter(), createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", protect, isRecruiter(), updateJob);
router.delete("/:id", protect, isRecruiter(), deleteJob);

module.exports = router;

const express = require("express");

const {
  applyJob,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/apply", protect, applyJob);
router.get("/", protect, getApplications);
router.get("/:id", protect, getApplicationById);
router.put("/status/:id", protect, updateApplicationStatus);
router.delete("/:id", protect, deleteApplication);

module.exports = router;
const express = require("express");
const {
  deleteResume,
  getResumeById,
  handleUploadError,
  uploadResumeFile,
} = require("../controllers/uploadController");
const { protect } = require("../middlewares/authMiddleware");
const { uploadResume } = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/resume", protect, uploadResume.single("resume"), handleUploadError, uploadResumeFile);
router.get("/:id", protect, getResumeById);
router.delete("/:id", protect, deleteResume);

module.exports = router;

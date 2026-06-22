const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");

const uploadResumeFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume PDF is required" });
    }

    const resume = await Resume.create({
      applicantId: req.user._id,
      fileUrl: `/uploads/resumes/${req.file.filename}`,
      extractedText: "",
    });

    return res.status(201).json({
      message: "Resume uploaded",
      resume,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to upload resume",
      error: error.message,
    });
  }
};

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate("applicantId", "name email role");

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.json({ resume });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid resume id",
      error: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const filePath = path.join(__dirname, "..", resume.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.json({ message: "Resume deleted" });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to delete resume",
      error: error.message,
    });
  }
};

const handleUploadError = (error, _req, res, next) => {
  if (!error) {
    return next();
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Resume must be 5MB or smaller" });
  }

  return res.status(400).json({ message: error.message });
};

module.exports = {
  uploadResumeFile,
  getResumeById,
  deleteResume,
  handleUploadError,
};

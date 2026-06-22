const Resume = require("../models/Resume");
const ActivityLog = require("../models/ActivityLog");

const uploadResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      user: req.user?._id,
      resumeUrl: req.body.resumeUrl,
    });

    await ActivityLog.create({
      action: "Resume Uploaded",
      user: req.user?._id,
    });

    res.status(201).json({
      message: "Resume uploaded successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};
const { extractTextFromPDF } = require("../backend/src/services/pdfService");
const Resume = require("../models/Resume");
const ActivityLog = require("../models/ActivityLog");

const uploadResume = async (req, res) => {
  try {
    const extractedText = await extractTextFromPDF(req.file.path);

    const resume = await Resume.create({
      applicantId: req.user?._id,
      fileUrl: req.file.path,
      extractedText,
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
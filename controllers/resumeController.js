const Application = require("../models/Application");
const logAction = require("../utils/auditLogger");

// Upload Resume
exports.uploadResume = async (req, res) => {
  try {
    await logAction(
      "RESUME_UPLOADED",
      req.user?._id,
      {
        fileName: req.file?.originalname,
      }
    );

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: req.file || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Download Resume
exports.downloadResume = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (!application.resumeUrl) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume URL retrieved successfully",
      data: {
        resumeUrl: application.resumeUrl,
      },
    });

    // Alternative:
    // return res.redirect(application.resumeUrl);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
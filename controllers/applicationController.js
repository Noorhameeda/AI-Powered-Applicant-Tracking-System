const Application = require("../models/Application");
const Notification = require("../models/Notification");
const ActivityLog = require("../models/ActivityLog");
const logAction = require("../utils/auditLogger");

// Apply for Job
exports.applyJob = async (req, res) => {
  try {
    const { job, resume } = req.body;

    const existingApplication = await Application.findOne({
      user: req.user._id,
      job,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      job,
      resume,
    });

    await logAction("APPLICATION_SUBMITTED", req.user._id, {
      applicationId: application._id,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get All Applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user")
      .populate("job")
      .populate("resume");

    res.status(200).json({
      success: true,
      message: "Applications retrieved successfully",
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get Application By ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("user")
      .populate("job")
      .populate("resume");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application retrieved successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update Application Status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    await Notification.create({
      recipient: application.user,
      message: `Your application status changed to ${status}`,
    });

    await ActivityLog.create({
      action: `Application status changed to ${status}`,
      user: req.user ? req.user._id : null,
    });

    await logAction("STATUS_CHANGED", req.user?._id, {
      applicationId: application._id,
      status,
    });

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete Application
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
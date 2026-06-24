const Application = require("../models/Application");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const ActivityLog = require("../models/ActivityLog");

const VALID_STATUSES = [
  "Applied",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const populateApplication = (query) => {
  return query
    .populate("user", "name email role")
    .populate("job", "title company location")
    .populate("resume", "fileUrl uploadedAt");
};

const applyJob = async (req, res) => {
  try {
    const { jobId, resumeId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    let resume = null;

    if (resumeId) {
      resume = await Resume.findById(resumeId);

      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
    }

    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      resume: resume?._id,
      status: "Applied",
    });

    await ActivityLog.create({
      action: "Application Submitted",
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Application submitted",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You have already applied to this job",
      });
    }

    return res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const query =
      req.user.role === "applicant"
        ? { user: req.user._id }
        : {};

    const applications = await populateApplication(
      Application.find(query).sort({ createdAt: -1 })
    );

    return res.json({ applications });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

const getApplicationById = async (req, res) => {
  try {
    const application = await populateApplication(
      Application.findById(req.params.id)
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.json({ application });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid application id",
      error: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({
        message: "applicationId and status are required",
      });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        allowedStatuses: VALID_STATUSES,
      });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (status === "Shortlisted") {
      await ActivityLog.create({
        action: "Candidate Shortlisted",
        user: req.user._id,
      });
    }

    if (status === "Rejected") {
      await ActivityLog.create({
        action: "Candidate Rejected",
        user: req.user._id,
      });
    }

    return res.json({
      message: "Application status updated",
      application,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update application status",
      error: error.message,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.json({
      message: "Application deleted",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
};

module.exports = {
  VALID_STATUSES,
  applyJob,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
const Job = require("../models/Job");

const validateJobPayload = (payload) => {
  const errors = [];

  if (!payload.title || !payload.title.trim()) {
    errors.push("Title is required");
  }

  if (!payload.description || !payload.description.trim()) {
    errors.push("Description is required");
  }

  if (!Array.isArray(payload.skills) || payload.skills.length === 0) {
    errors.push("Skills array is required");
  }

  if (payload.salary === undefined || payload.salary === null || Number.isNaN(Number(payload.salary))) {
    errors.push("Salary is required and must be a number");
  }

  if (!payload.location || !payload.location.trim()) {
    errors.push("Location is required");
  }

  return errors;
};

const createJob = async (req, res) => {
  try {
    const errors = validateJobPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      skills: req.body.skills,
      salary: Number(req.body.salary),
      location: req.body.location,
      recruiterId: req.user?._id,
    });

    return res.status(201).json({ message: "Job created", job });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create job", error: error.message });
  }
};

const getJobs = async (_req, res) => {
  try {
    const jobs = await Job.find().populate("recruiterId", "name email role").sort({ createdAt: -1 });
    return res.json({ jobs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("recruiterId", "name email role");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ job });
  } catch (error) {
    return res.status(400).json({ message: "Invalid job id", error: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const errors = validateJobPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        skills: req.body.skills,
        salary: Number(req.body.salary),
        location: req.body.location,
      },
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ message: "Job updated", job });
  } catch (error) {
    return res.status(400).json({ message: "Failed to update job", error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.json({ message: "Job deleted" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to delete job", error: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  validateJobPayload,
};

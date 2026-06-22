const Job = require("../models/Job");

/* CREATE JOB */
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      location: req.body.location,
      skills: req.body.skills,
      salary: req.body.salary,
      recruiterId: req.user?._id,
    });

    res.status(201).json({ message: "Job created", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL JOBS */
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* 🔍 SEARCH JOBS (DEBUG VERSION) */
const searchJobs = async (req, res) => {
  console.log("SEARCH ROUTE HIT");

  return res.status(200).json({
    success: true,
    message: "Search route working",
    keyword: req.query.keyword,
  });
};

/* GET JOB BY ID */
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ job });
  } catch (error) {
    res.status(400).json({ message: "Invalid job id" });
  }
};

/* UPDATE JOB */
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ job });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* DELETE JOB */
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* EXPORTS */
module.exports = {
  createJob,
  getJobs,
  searchJobs,
  getJobById,
  updateJob,
  deleteJob,
};
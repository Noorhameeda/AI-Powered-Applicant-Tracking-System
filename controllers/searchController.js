const Job = require("../models/Job");

// Search Jobs
exports.searchJobs = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search keyword",
      });
    }

    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { skills: { $regex: keyword, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Filter Jobs
exports.filterJobs = async (req, res) => {
  try {
    const { location, salary, skills } = req.query;

    let query = {};

    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (salary) {
      query.salary = {
        $gte: Number(salary),
      };
    }

    if (skills) {
      query.skills = {
        $in: [skills],
      };
    }

    const jobs = await Job.find(query);

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
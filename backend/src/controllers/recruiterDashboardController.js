const Job = require("../models/Job");
const Application = require("../models/Application");

const getRecruiterDashboard = async (req, res) => {
  try {
    // Total Jobs
    const totalJobs = await Job.countDocuments();

    // Total Applications
    const totalApplications = await Application.countDocuments();

    // Total Interviews
    const totalInterviews = await Application.countDocuments({
      status: "Interview",
    });

    // Selected Candidates
    const selectedCandidates = await Application.countDocuments({
      status: "Selected",
    });

    // Recent Candidates
    const recentCandidates = await Application.find()
      .populate("user", "name email")
      .populate("job", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    const dashboardData = {
      totalJobs,
      totalApplications,
      totalInterviews,
      selectedCandidates,
      recentCandidates,
    };

    return res.status(200).json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load recruiter dashboard",
      error: error.message,
    });
  }
};

module.exports = {
  getRecruiterDashboard,
};
const Job = require("../models/Job");
const Application = require("../models/Application");
const ActivityLog = require("../models/ActivityLog");

const getDashboardStats = async (req, res) => {
  try {
    // Total Jobs
    const totalJobs = await Job.countDocuments();

    // Total Applicants
    const totalApplicants = await Application.countDocuments();

    // Selected Candidates
    const selectedCandidates = await Application.countDocuments({
      status: "Selected",
    });

    // Rejected Candidates
    const rejectedCandidates = await Application.countDocuments({
      status: "Rejected",
    });

    // Interview Candidates
    const interviewCandidates = await Application.countDocuments({
      status: "Interview",
    });

    // Applications Per Job
    const applicationsPerJob = await Application.aggregate([
      {
        $group: {
          _id: "$job",
          totalApplications: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "jobs",
          localField: "_id",
          foreignField: "_id",
          as: "jobDetails",
        },
      },
      {
        $unwind: {
          path: "$jobDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 0,
          jobId: "$_id",
          jobTitle: "$jobDetails.title",
          totalApplications: 1,
        },
      },
    ]);

    // Monthly Applications
    const monthlyApplications = await Application.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Recent Activities
    const recentActivities = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      dashboard: {
        totalJobs,
        totalApplicants,
        selectedCandidates,
        rejectedCandidates,
        interviewCandidates,
        applicationsPerJob,
        monthlyApplications,
        recentActivities,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
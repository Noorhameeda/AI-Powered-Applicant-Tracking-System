const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

/*
=====================================
Candidate Ranking
=====================================
*/
exports.getCandidateRanking = async (req, res) => {
  try {
    const rankings = await Application.find()
      .populate("user", "name email")
      .sort({ aiScore: -1 });

    const result = rankings.map((app) => ({
      name: app.user?.name,
      email: app.user?.email,
      score: app.aiScore,
      matchedSkills: app.matchedSkills || [],
      missingSkills: app.missingSkills || [],
      status: app.status,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
=====================================
Admin Dashboard
=====================================
*/
exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const recruiters = await User.countDocuments({
      role: "recruiter",
    });

    const applicants = await User.countDocuments({
      role: "candidate",
    });

    const jobs = await Job.countDocuments();

    const applications = await Application.countDocuments();

    res.status(200).json({
      totalUsers,
      recruiters,
      applicants,
      jobs,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
=====================================
Applicant Dashboard
=====================================
*/
exports.getApplicantDashboard = async (req, res) => {
  try {
    const applicantId = req.user?.id;

    const appliedJobs = await Application.countDocuments({
      user: applicantId,
    });

    const interviewCount = await Application.countDocuments({
      user: applicantId,
      status: "Interview",
    });

    const statusHistory = await Application.find({
      user: applicantId,
    }).select("status createdAt");

    res.status(200).json({
      appliedJobs,
      interviewCount,
      statusHistory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
=====================================
Charts Aggregation
=====================================
*/
exports.getChartsData = async (req, res) => {
  try {
    const monthlyApplications = await Application.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const statusDistribution = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const skillsFrequency = await Job.aggregate([
      {
        $unwind: "$skills",
      },
      {
        $group: {
          _id: "$skills",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json({
      monthlyApplications,
      statusDistribution,
      skillsFrequency,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/*
=====================================
Activity Analytics
=====================================
*/
exports.getActivityAnalytics = async (req, res) => {
  try {
    const activities = await ActivityLog.aggregate([
      {
        $group: {
          _id: "$action",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
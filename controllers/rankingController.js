const Application = require("../models/Application");

const getCandidateRanking = async (req, res) => {
  try {
    const rankedCandidates = await Application.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "candidate",
        },
      },

      {
        $unwind: "$candidate",
      },

      {
        $project: {
          _id: 0,
          candidateName: "$candidate.name",
          email: "$candidate.email",
          score: "$aiScore",
          matchedSkills: {
            $ifNull: ["$candidate.skills", []],
          },
          status: 1,
        },
      },

      {
        $sort: {
          score: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: rankedCandidates.length,
      rankedCandidates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch candidate rankings",
      error: error.message,
    });
  }
};

module.exports = {
  getCandidateRanking,
};
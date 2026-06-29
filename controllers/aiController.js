const AIAnalysis = require("../models/AIAnalysis");
const Application = require("../models/Application");
const { analyzeResume } = require("../services/aiService");

const buildAnalysisInput = async (body) => {
  if (!body.applicationId) {
    return {
      application: null,
      resumeText: body.resumeText || "",
      jobDescription: body.jobDescription || "",
      requiredSkills: body.requiredSkills || body.skills || [],
    };
  }

  const application = await Application.findById(body.applicationId)
    .populate("job")
    .populate("resume")
    .populate("user", "name email role");

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    application,
    resumeText: application.resume?.extractedText || body.resumeText || "",
    jobDescription: application.job?.description || body.jobDescription || "",
    requiredSkills: application.job?.skills || body.requiredSkills || [],
  };
};

const analyzeApplication = async (req, res) => {
  try {
    const input = await buildAnalysisInput(req.body);
    const analysis = await analyzeResume(input);

    if (input.application) {
      await AIAnalysis.findOneAndUpdate(
        { applicationId: input.application._id },
        { applicationId: input.application._id, ...analysis },
        { upsert: true, new: true, runValidators: true }
      );

      await Application.findByIdAndUpdate(input.application._id, {
        aiScore: analysis.score,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully",
      data: analysis,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 404
        ? "Application not found"
        : "Failed to analyze resume",
    });
  }
};

const getRankings = async (_req, res) => {
  try {
    const rankings = await AIAnalysis.find()
      .populate({
        path: "applicationId",
        populate: [
          { path: "user", select: "name email role" },
          { path: "job", select: "title company location" },
        ],
      })
      .sort({ score: -1 });

    return res.status(200).json({
      success: true,
      message: "AI rankings retrieved successfully",
      data: rankings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch rankings",
    });
  }
};

const getApplicationAnalysis = async (req, res) => {
  try {
    const analysis = await AIAnalysis.findOne({
      applicationId: req.params.applicationId,
    }).populate("applicationId");

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis report not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Analysis report retrieved successfully",
      data: {
        score: analysis.score,
        summary: analysis.summary,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analysis report",
    });
  }
};

module.exports = {
  analyzeApplication,
  getRankings,
  getApplicationAnalysis,
};
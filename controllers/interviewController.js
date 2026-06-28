const Interview = require("../models/Interview");
const logAction = require("../utils/auditLogger");

// Schedule Interview
exports.scheduleInterview = async (req, res) => {
  try {
    const {
      applicationId,
      recruiterId,
      candidateId,
      date,
      time,
      meetingLink,
      status,
    } = req.body;

    const interview = await Interview.create({
      applicationId,
      recruiterId,
      candidateId,
      date,
      time,
      meetingLink,
      status,
    });

    await logAction(
      "INTERVIEW_SCHEDULED",
      req.user?._id,
      {
        interviewId: interview._id,
      }
    );

    res.status(201).json({
      success: true,
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Interviews
exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("candidateId", "name email")
      .populate("recruiterId", "name email")
      .populate("applicationId");

    res.status(200).json({
      success: true,
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Interview
exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interview updated successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Interview
exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    await interview.deleteOne();

    res.status(200).json({
      success: true,
      message: "Interview deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
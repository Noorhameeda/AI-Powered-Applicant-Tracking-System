const ActivityLog = require("../models/ActivityLog");

const getActivities = async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createActivity = async (req, res) => {
  try {
    const activity = await ActivityLog.create({
      action: req.body.action,
      user: req.body.user,
    });

    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getActivities,
  createActivity,
};
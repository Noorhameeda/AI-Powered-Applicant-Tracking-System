const AuditLog = require("../models/AuditLog");

const logAction = async (action, user, metadata = {}) => {
  try {
    await AuditLog.create({
      action,
      user,
      metadata,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = logAction;
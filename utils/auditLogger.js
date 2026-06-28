const AuditLog = require("../models/AuditLog");

const logAction = async (
  action,
  user = null,
  metadata = {}
) => {
  try {
    await AuditLog.create({
      action,
      user,
      metadata,
    });
  } catch (error) {
    console.error(
      "Audit Log Error:",
      error.message
    );
  }
};

module.exports = logAction;
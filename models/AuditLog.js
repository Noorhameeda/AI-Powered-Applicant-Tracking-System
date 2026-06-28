const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

// Performance Indexes
auditLogSchema.index({
  action: 1,
  createdAt: -1,
});

auditLogSchema.index({
  user: 1,
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
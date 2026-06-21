const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },

  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },

  status: {
    type: String,
    enum: [
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ],
    default: "Applied",
  },

  aiScore: {
    type: Number,
    default: 0,
  },

  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes
applicationSchema.index({ applicantId: 1 });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model("Application", applicationSchema);
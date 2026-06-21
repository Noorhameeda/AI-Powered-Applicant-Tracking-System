const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
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
      enum: ["Applied", "Reviewing", "Shortlisted", "Interview", "Selected", "Rejected"],
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

applicationSchema.index({ applicantId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ applicantId: 1 });
applicationSchema.index({ status: 1 });

applicationSchema.virtual("aiAnalysis", {
  ref: "AIAnalysis",
  localField: "_id",
  foreignField: "applicationId",
  justOne: true,
});

module.exports = mongoose.model("Application", applicationSchema);

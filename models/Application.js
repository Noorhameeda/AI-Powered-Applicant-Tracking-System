const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewing", "Shortlisted", "Rejected", "Selected"],
      default: "Pending"
    },
    aiScore: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

applicationSchema.index({ applicantId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ applicantId: 1 });

applicationSchema.virtual("aiAnalysis", {
  ref: "AIAnalysis",
  localField: "_id",
  foreignField: "applicationId",
  justOne: true
});

module.exports = mongoose.model("Application", applicationSchema);

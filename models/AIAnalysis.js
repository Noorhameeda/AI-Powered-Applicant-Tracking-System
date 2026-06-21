const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    summary: {
      type: String,
      default: ""
    },
    matchedSkills: {
      type: [String],
      default: []
    },
    missingSkills: {
      type: [String],
      default: []
    },
    strengths: {
      type: [String],
      default: []
    },
    weaknesses: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

aiAnalysisSchema.index({ applicationId: 1 }, { unique: true });
aiAnalysisSchema.index({ score: -1 });

module.exports = mongoose.model("AIAnalysis", aiAnalysisSchema);

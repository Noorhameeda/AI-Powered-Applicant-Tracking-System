const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema(
{
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application"
  },
  score: Number,
  summary: String,
  matchedSkills: [String],
  missingSkills: [String]
},
{ timestamps: true }
);

module.exports = mongoose.model("AIAnalysis", aiAnalysisSchema);
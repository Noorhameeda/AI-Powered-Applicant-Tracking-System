const mongoose = require("mongoose");

const aiAnalysisSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true, // keep index here OR use schema.index, not both
    },

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

// ❌ REMOVE THIS LINE if present
// aiAnalysisSchema.index({ applicationId: 1 });

module.exports = mongoose.model("AIAnalysis", aiAnalysisSchema);
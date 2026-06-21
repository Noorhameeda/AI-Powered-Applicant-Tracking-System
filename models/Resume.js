const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      default: "",
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

resumeSchema.index({ applicantId: 1 });

module.exports = mongoose.model("Resume", resumeSchema);

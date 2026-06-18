const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
{
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  fileUrl: String,
  extractedText: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
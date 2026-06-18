const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },
  status: {
    type: String,
    default: "Pending"
  },
  aiScore: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
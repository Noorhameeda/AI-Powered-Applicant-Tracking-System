const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
  title: String,
  description: String,
  skills: [String],
  location: String,
  salary: Number,
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
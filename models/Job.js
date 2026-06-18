const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  skills: {
    type: [String],
    required: true,
    validate: {
      validator: (skills) => Array.isArray(skills) && skills.length > 0,
      message: "At least one skill is required"
    }
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    required: true
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);

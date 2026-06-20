const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      validate: {
        validator: (skills) => Array.isArray(skills) && skills.length > 0,
        message: "At least one skill is required",
      },
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship", "remote"],
      default: "full-time",
    },
    experienceRequired: {
      type: String,
      default: "",
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ title: 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ location: 1 });

module.exports = mongoose.model("Job", jobSchema);

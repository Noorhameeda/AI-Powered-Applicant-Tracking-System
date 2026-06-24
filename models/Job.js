const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    salary: {
      type: Number,
      default: 0,
    },

    experience: {
      type: Number,
      default: 0,
    },

    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Search Indexes
jobSchema.index({ title: 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ company: 1 });

// Text Search Index
jobSchema.index({
  title: "text",
  skills: "text",
  description: "text",
  company: "text",
});

module.exports = mongoose.model("Job", jobSchema);
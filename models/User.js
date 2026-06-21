const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["applicant", "recruiter", "admin"],
      default: "applicant",
    },
    profileImage: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.virtual("jobs", {
  ref: "Job",
  localField: "_id",
  foreignField: "recruiterId",
});

userSchema.virtual("applications", {
  ref: "Application",
  localField: "_id",
  foreignField: "applicantId",
});

userSchema.virtual("resumes", {
  ref: "Resume",
  localField: "_id",
  foreignField: "applicantId",
});

module.exports = mongoose.model("User", userSchema);

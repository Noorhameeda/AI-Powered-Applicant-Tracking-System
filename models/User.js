const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // optional (keep if you want search optimization)
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
      enum: ["candidate", "recruiter", "admin"],
      default: "candidate",
    },
  },
  { timestamps: true }
);

// ❌ REMOVE THIS (causes duplicate index warning)
// userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
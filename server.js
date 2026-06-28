require("dotenv").config();

const express = require("express");
const path = require("path");
const connectDB = require("./config/db");

// Security Packages
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const resumeDownloadRoutes = require("./routes/resumeDownloadRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const activityRoutes = require("./routes/activityRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const adminRoutes = require("./routes/adminRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const emailRoutes = require("./routes/emailRoutes");


const app = express();

// Connect Database
connectDB();

// Rate Limiter
const limiter = rateLimit({
windowMs: 15 * 60 * 1000,
max: 100,
});

app.use(limiter);

// XSS Protection
app.use(xss());

// Mongo Injection Protection
app.use(mongoSanitize());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(
"/uploads",
express.static(path.join(__dirname, "uploads"))
);

// Home Route
app.get("/", (req, res) => {
res.send("ATS Backend Running");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Job Routes
app.use("/api/jobs", jobRoutes);

// Application Routes
app.use("/api/applications", applicationRoutes);

// Upload Routes
app.use("/api/upload", uploadRoutes);

// Resume Routes
app.use("/api/resumes", resumeRoutes);

// Resume Download Routes
app.use("/api/resume", resumeDownloadRoutes);

// Notification Routes
app.use("/api/notifications", notificationRoutes);

// Activity Log Routes
app.use("/api/activity", activityRoutes);

// AI Routes
app.use("/api/ai", aiRoutes);

// Recruiter Analytics Routes
app.use("/api/analytics", analyticsRoutes);
app.use("/api/email", emailRoutes);

// Admin Analytics Routes
app.use("/api/admin", adminRoutes);

// Interview Management Routes
app.use("/api/interviews", interviewRoutes);

// 404 Route Handler
app.use((req, res) => {
res.status(404).json({
success: false,
message: "Route not found",
});
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

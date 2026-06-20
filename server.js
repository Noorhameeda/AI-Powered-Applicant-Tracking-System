require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./backend/src/routes/authRoutes");
const jobRoutes = require("./backend/src/routes/jobRoutes");

const app = express();

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("ATS Backend Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");

// Admin Dashboard Statistics
exports.getStats = async (req, res) => {
try {
const users = await User.countDocuments();
const jobs = await Job.countDocuments();
const applications = await Application.countDocuments();
const interviews = await Interview.countDocuments();

```
res.status(200).json({
  success: true,
  users,
  jobs,
  applications,
  interviews,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get All Users
exports.getUsers = async (req, res) => {
try {
const users = await User.find();

```
res.status(200).json({
  success: true,
  count: users.length,
  users,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Get All Jobs
exports.getJobs = async (req, res) => {
try {
const jobs = await Job.find();

```
res.status(200).json({
  success: true,
  count: jobs.length,
  jobs,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Generate Reports
exports.getReports = async (req, res) => {
try {
res.status(200).json({
success: true,
generatedAt: new Date(),
report: {
totalUsers: await User.countDocuments(),
totalJobs: await Job.countDocuments(),
totalApplications: await Application.countDocuments(),
totalInterviews: await Interview.countDocuments(),
},
});
} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

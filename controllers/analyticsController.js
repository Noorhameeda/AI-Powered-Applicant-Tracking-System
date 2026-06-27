const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");
const User = require("../models/User");

// Recruiter Analytics
exports.getRecruiterAnalytics = async (req, res) => {
try {
const totalJobs = await Job.countDocuments();

```
const totalApplications =
  await Application.countDocuments();

const totalInterviews =
  await Interview.countDocuments();

res.status(200).json({
  success: true,
  totalJobs,
  totalApplications,
  totalInterviews,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Job Analytics
exports.getJobAnalytics = async (req, res) => {
try {
const applications =
await Application.countDocuments({
job: req.params.id,
});

```
res.status(200).json({
  success: true,
  jobId: req.params.id,
  applications,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Candidate Analytics
exports.getCandidateAnalytics = async (req, res) => {
try {
const totalCandidates =
await User.countDocuments({
role: "candidate",
});

```
res.status(200).json({
  success: true,
  totalCandidates,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

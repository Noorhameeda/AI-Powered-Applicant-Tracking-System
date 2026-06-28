const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Interview = require("../models/Interview");
const Report = require("../models/Report");

// Admin Dashboard
exports.getAdminReport = async (req, res) => {
try {
const usersGrowth = await User.aggregate([
{
$group: {
_id: {
month: { $month: "$createdAt" },
year: { $year: "$createdAt" },
},
total: { $sum: 1 },
},
},
]);

```
const jobsGrowth = await Job.aggregate([
  {
    $group: {
      _id: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
      },
      total: { $sum: 1 },
    },
  },
]);

const applicationsGrowth = await Application.aggregate([
  {
    $group: {
      _id: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
      },
      total: { $sum: 1 },
    },
  },
]);

const monthlyStats = {
  totalUsers: await User.countDocuments(),
  totalJobs: await Job.countDocuments(),
  totalApplications: await Application.countDocuments(),
};

res.status(200).json({
  success: true,
  usersGrowth,
  jobsGrowth,
  applicationsGrowth,
  monthlyStats,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Recruiter Dashboard
exports.getRecruiterReport = async (req, res) => {
try {
const hiringFunnel = await Application.aggregate([
{
$group: {
_id: "$status",
count: { $sum: 1 },
},
},
]);

```
const totalApplications =
  await Application.countDocuments();

const hired =
  await Application.countDocuments({
    status: "Hired",
  });

const conversionRate =
  totalApplications > 0
    ? (hired / totalApplications) * 100
    : 0;

const topJobs = await Application.aggregate([
  {
    $group: {
      _id: "$job",
      applications: { $sum: 1 },
    },
  },
  {
    $sort: {
      applications: -1,
    },
  },
  {
    $limit: 5,
  },
]);

const topCandidates =
  await Application.aggregate([
    {
      $group: {
        _id: "$user",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

res.status(200).json({
  success: true,
  hiringFunnel,
  conversionRate,
  topJobs,
  topCandidates,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

// Applicant Dashboard
exports.getApplicantReport = async (req, res) => {
try {
const timeline = await Application.find({
user: req.user._id,
}).sort({ createdAt: -1 });

```
const interviews =
  await Interview.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

res.status(200).json({
  success: true,
  timeline,
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

// CSV Export
exports.exportApplicationsCSV = async (req, res) => {
try {
const applications =
await Application.find()
.populate("user")
.populate("job");

```
res.status(200).json({
  success: true,
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

// Excel Export
exports.exportJobsExcel = async (req, res) => {
try {
const jobs = await Job.find();

```
res.status(200).json({
  success: true,
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

// PDF Export
exports.exportPDFReport = async (req, res) => {
try {
const report = await Report.findById(
req.params.id
);

```
res.status(200).json({
  success: true,
  report,
});
```

} catch (error) {
res.status(500).json({
success: false,
message: error.message,
});
}
};

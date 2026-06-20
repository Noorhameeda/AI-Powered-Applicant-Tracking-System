const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      message: "Recruiter access only",
    });
  }

  next();
};

const isApplicant = (req, res, next) => {
  if (req.user.role !== "applicant") {
    return res.status(403).json({
      message: "Applicant access only",
    });
  }

  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }

  next();
};

module.exports = {
  isRecruiter,
  isApplicant,
  isAdmin,
};
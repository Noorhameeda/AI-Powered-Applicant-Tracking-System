const authorizeRole = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role !== role) {
    return res.status(403).json({ message: `${role} role required` });
  }

  return next();
};

const isRecruiter = () => authorizeRole("recruiter");
const isApplicant = () => authorizeRole("applicant");
const isAdmin = () => authorizeRole("admin");

module.exports = {
  isRecruiter,
  isApplicant,
  isAdmin,
};

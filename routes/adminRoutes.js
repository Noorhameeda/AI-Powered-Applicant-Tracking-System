const express = require("express");
const router = express.Router();

const {
getStats,
getUsers,
getJobs,
getReports,
} = require("../controllers/adminController");

router.get("/stats", getStats);
router.get("/users", getUsers);
router.get("/jobs", getJobs);
router.get("/reports", getReports);

module.exports = router;

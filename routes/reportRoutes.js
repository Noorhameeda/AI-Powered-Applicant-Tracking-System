const express = require("express");

const router = express.Router();

const {
getAdminReport,
getRecruiterReport,
getApplicantReport,
exportApplicationsCSV,
exportJobsExcel,
exportPDFReport,
} = require("../controllers/reportController");

router.get(
"/admin-report",
getAdminReport
);

router.get(
"/recruiter-report",
getRecruiterReport
);

router.get(
"/applicant-report",
getApplicantReport
);

router.get(
"/export/csv",
exportApplicationsCSV
);

router.get(
"/export/excel",
exportJobsExcel
);

router.get(
"/export/pdf/:id",
exportPDFReport
);

module.exports = router;

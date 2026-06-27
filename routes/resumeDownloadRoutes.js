const express = require("express");
const router = express.Router();

const {
downloadResume,
} = require("../controllers/resumeController");

router.get("/download/:id", downloadResume);

module.exports = router;

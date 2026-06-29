const express = require("express");

const {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} = require("../controllers/jobController");

const {
  searchJobs,
  filterJobs,
} = require("../controllers/searchController");

const { protect } = require("../middlewares/authMiddleware");
const { isRecruiter } = require("../middlewares/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/jobs/create:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     responses:
 *       201:
 *         description: Job created successfully
 */
router.post("/create", protect, isRecruiter, createJob);

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 */
router.get("/", getJobs);

/**
 * @swagger
 * /api/jobs/search:
 *   get:
 *     summary: Search jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Search completed successfully
 */
router.get("/search", searchJobs);

/**
 * @swagger
 * /api/jobs/filter:
 *   get:
 *     summary: Filter jobs
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Jobs filtered successfully
 */
router.get("/filter", filterJobs);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job retrieved successfully
 */
router.get("/:id", getJobById);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put("/:id", protect, isRecruiter, updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
router.delete("/:id", protect, isRecruiter, deleteJob);

module.exports = router;
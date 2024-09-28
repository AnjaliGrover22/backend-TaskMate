const express = require("express");
const router = express.Router();
const PintoDashboardController = require("../controllers/pintoDashboardController");

// Pin a job
router.post("/", PintoDashboardController.createDashboard);

// Unpin a job
router.delete("/:professionalId/:job_id", PintoDashboardController.deleteDashboard);

// Get all pinned jobs for a specific professional
router.get("/:professionalId", PintoDashboardController.getPinnedJobsByProf);

module.exports = router;

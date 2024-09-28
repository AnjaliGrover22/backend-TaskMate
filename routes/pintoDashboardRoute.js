const express = require("express");
const router = express.Router();
const PintoDashboardController = require("../controllers/pintoDashboardController");

// Pin a job
router.post("/", PintoDashboardController.createDashboard);

// Unpin a job
router.delete("/", PintoDashboardController.deleteDashboard);

// Get all pinned jobs for a specific professional
router.get("/:prof_id", PintoDashboardController.getPinnedJobsByProf);

module.exports = router;

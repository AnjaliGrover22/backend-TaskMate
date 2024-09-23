// Import the Express framework
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the PintoDashboardController
// This controller contains the logic for handling dashboard-related operations
const PintoDashboardController = require("../controllers/pintoDashboardController");

// Define routes for the PintoDashboard resource

// POST /
// Creates a new dashboard
// This route doesn't include an ID as it's for creating a new resource
router.post("/", PintoDashboardController.createDashboard);

// GET /
// Retrieves all dashboards
// This route doesn't include an ID as it's fetching all resources
router.get("/", PintoDashboardController.getDashboards);

// GET /:id
// Retrieves a specific dashboard by its ID
// The :id in the path is a route parameter that will be passed to the controller
router.get("/:id", PintoDashboardController.getDashboardById);

// PUT /:id
// Updates a specific dashboard identified by its ID
// PUT is typically used for updating an entire resource
router.put("/:id", PintoDashboardController.updateDashboard);

// DELETE /:id
// Deletes a specific dashboard identified by its ID
router.delete("/:id", PintoDashboardController.deleteDashboard);

// Export the router so it can be used in other parts of the application
module.exports = router;

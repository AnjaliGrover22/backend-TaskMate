const express = require("express");
const addJobrouter = express.Router();
const upload = require("../services/upload"); // Middleware for handling image uploads
const requireAuth = require("../middlewares/requireAuth"); // Middleware to ensure authentication

const {
  createNewJob,
  getJobsByProfessional,
  getProfessionalsForServiceWithDetails,
  getOneJobById,
  updateJobById,
  deleteJobById,
} = require("../controllers/addJobModalController");

// Route to create a new job (for authenticated professionals only)
addJobrouter.post(
  "/",
  requireAuth,
  upload.single("referenceImage"),
  createNewJob
);

// Route to get all jobs for the logged-in professional (for authenticated professionals only)
addJobrouter.get("/professional", requireAuth, getJobsByProfessional);

// GET professionals for a specific service with details
addJobrouter.get(
  "/professionals-for-service-details/:serviceId",
  getProfessionalsForServiceWithDetails
);

// Route to get a single job by its ID
addJobrouter.get("/:id", requireAuth, getOneJobById);

// Route to update a job by its ID
addJobrouter.put(
  "/:id",
  requireAuth,
  upload.single("referenceImage"),
  updateJobById
);

// Route to delete a job by its ID
addJobrouter.delete("/:id", requireAuth, deleteJobById);

module.exports = addJobrouter;

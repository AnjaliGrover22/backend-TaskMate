const express = require("express");
const addJobrouter = express.Router();
const upload = require("../services/upload"); // Middleware for handling image uploads
// const requireAuth = require("../middlewares/requireAuth"); // Middleware to ensure authentication

const {
  createNewJob,
  getJobsByProfessional,
  getOneJobById,
  updateJobById,
  deleteJobById,
} = require("../controllers/addJobModalController");

// Route to create a new job (for authenticated professionals only)
addJobrouter.post("/", upload.single("referenceImage"), createNewJob);

// Route to get all jobs for the logged-in professional (for authenticated professionals only)
addJobrouter.get("/professional", getJobsByProfessional);

// Route to get a single job by its ID
addJobrouter.get("/:id", getOneJobById);

// Route to update a job by its ID
addJobrouter.put(
  "/:id",

  upload.single("referenceImage"),
  updateJobById
);

// Route to delete a job by its ID
addJobrouter.delete("/:id", deleteJobById);

module.exports = addJobrouter;

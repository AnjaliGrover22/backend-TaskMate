const express = require("express");
const addJobrouter = express.Router();
const {
  createNewJob,
  getAllJobs,
  getOneJobById,
  UpdateJobById,
  DeleteJobById,
} = require("../controllers/addJobModalController");
const upload = require("../services/upload"); // Import the multer upload

// Create a new job
addJobrouter.post("/", upload.single("referenceImage"), createNewJob); // "referenceImage" should match the form field name

// Get all jobs
addJobrouter.get("/", getAllJobs);

// Get a job by ID
addJobrouter.get("/:id", getOneJobById);

// Update a job
addJobrouter.put("/:id", upload.single("referenceImage"), UpdateJobById);

// Delete a job
addJobrouter.delete("/:id", DeleteJobById);

module.exports = addJobrouter;

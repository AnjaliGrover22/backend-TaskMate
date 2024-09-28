const express = require("express");
const upload = require("../services/upload");
const requireAuth = require("../middlewares/requireAuth"); // Middleware to ensure authentication

const {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
  getProfessionalsByService,
  getAllProfessionals,
  updateProfessional,
  uploadProfessionalImage,
} = require("../controllers/professionalController");

const app = express.Router();

// Login
app.post("/login", loginProfessional);

// Signup
app.post("/signup", signUpProfessional);

// Get Professional by ID
app.get("/:id", getProfessionalById);

// Get Professionals by Service ID
app.get("/services/:serviceId", getProfessionalsByService);

// Get all Professionals
app.get("/", getAllProfessionals);

// Update Professional
app.put("/:id", updateProfessional);

app
  .route("/:id/uploadImage")
  .put(upload.single("picture"), uploadProfessionalImage);

module.exports = app;

const express = require("express");
const upload = require("../services/upload");
const requireAuth = require("../middlewares/requireAuth"); // Middleware to ensure authentication

const {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
  getAllProfessionals,
  updateProfessional,
  uploadProfessionalImage,
  getProfessionalProfile, // Add this new controller function
} = require("../controllers/professionalController");

const app = express.Router();

// Login
app.post("/login", loginProfessional);

// Signup
app.post("/signup", signUpProfessional);

// Get Professional by ID
app.get("/:id", getProfessionalById);

// Get all Professionals
app.get("/", getAllProfessionals);

// Update Professional
app.put("/:id", updateProfessional);

app.route("/:id/uploadImage").put(upload.single("picture"), uploadProfessionalImage);

// New route to fetch the profile of the logged-in professional
app.get("/profile", requireAuth, getProfessionalProfile); // Ensure the user is authenticated

module.exports = app;

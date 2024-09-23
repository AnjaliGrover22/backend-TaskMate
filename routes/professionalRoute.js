// routes/professionalRoute.js
const express = require("express");
const upload = require("../services/upload");

const {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
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

// Update Professional
app.put("/:id", updateProfessional);

app
  .route("/:id/uploadImage")
  .put(upload.single("picture"), uploadProfessionalImage);

module.exports = app;

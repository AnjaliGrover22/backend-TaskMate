// routes/professionalRoute.js
const express = require("express");

const {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
  updateProfessional,
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

module.exports = app;

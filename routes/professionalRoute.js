// routes/professionalRoute.js
const express = require("express");

const {
  loginProfessional,
  signUpProfessional,
} = require("../controllers/professionalController");

const app = express.Router();

// Login
app.post("/login", loginProfessional);

// Signup
app.post("/signup", signUpProfessional);

module.exports = app;

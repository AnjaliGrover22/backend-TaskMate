const express = require("express");
const upload = require("../services/upload");
const {
  loginCustomer,
  signUpCustomer,
  getCustomerById,
  updateCustomer,
  uploadCustomerImage,
} = require("../controllers/customerController");

const app = express.Router();

// Login
app.post("/login", loginCustomer);

// Signup
app.post("/signup", signUpCustomer);

// Get Customer by ID
app.get("/:id", getCustomerById);

// Update Customer
app.put("/:id", updateCustomer);

app
  .route("/:id/uploadImage")
  .post(upload.single("profileImage"), uploadCustomerImage);

module.exports = app;

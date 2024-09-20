const express = require("express");

const {
  loginCustomer,
  signUpCustomer,
} = require("../controllers/customerController");

const app = express.Router();

//Login
app.post("/login", loginCustomer);

//Signup
app.post("/signup", signUpCustomer);

module.exports = app;

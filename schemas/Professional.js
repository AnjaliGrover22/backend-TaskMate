// schemas/Professional.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const professionalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static method for signing up
professionalSchema.statics.signup = async function (email, password) {
  // Validation
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be strong: at least 8 characters, 1 uppercase, 1 number, and 1 symbol."
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const professional = await this.create({ email, password: hash });

  return professional;
};

// Static method for logging in
professionalSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const professional = await this.findOne({ email });

  if (!professional) {
    throw Error("Professional does not exist or incorrect email");
  }

  const match = await bcrypt.compare(password, professional.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return professional;
};

module.exports = mongoose.model("Professional", professionalSchema);

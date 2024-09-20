const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const professionalSchema = new mongoose.Schema({
  profileImage: {
    type: String, // URL or path to the profile image
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    required: true,
    validate: [
      (value) => validator.isStrongPassword(value),
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol",
    ],
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: [
      (value) => validator.isMobilePhone(value),
      "Invalid phone number",
    ],
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  aboutMe: {
    type: String,
  },
  jobProfile: {
    experience: {
      type: Number,
      required: true,
    },
    skill: {
      type: [String], // Array of skills
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    paymentOption: {
      type: String,
      enum: ["cash", "credit", "bank transfer"],
      required: true,
    },
  },
});

// Custom static signup method
professionalSchema.statics.signup = async function (
  profileImage,
  firstName,
  lastName,
  gender,
  email,
  password,
  phoneNumber,
  address,
  aboutMe,
  jobProfile
) {
  // Check if email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const professional = await this.create({
    profileImage,
    firstName,
    lastName,
    gender,
    email,
    password: hash,
    phoneNumber,
    address,
    aboutMe,
    jobProfile,
  });

  return professional;
};

// Static login method
professionalSchema.statics.login = async function (email, password) {
  const professional = await this.findOne({ email });

  if (!professional) {
    throw Error("Professional not found");
  }

  const match = await bcrypt.compare(password, professional.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return professional;
};

module.exports = mongoose.model("Professional", professionalSchema);

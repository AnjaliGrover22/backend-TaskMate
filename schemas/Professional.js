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
    validate: [
      (value) => validator.isMobilePhone(value),
      "Invalid phone number",
    ],
  },
  address: {
    street: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  aboutMe: {
    type: String,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback", // Reference to Feedback schema
    },
  ],
  jobProfile: {
    perHrCharge: { type: Number },
    completedHrs: { type: Number },
    experience: {
      type: Number,
    },
    skill: [
      {
        type: mongoose.Schema.Types.Mixed, // Allow both ObjectId and string
      },
    ],
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    paymentOption: [
      {
        type: String,
        enum: ["bank", "paypal", "cash"],
      },
    ],
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
  rating,
  jobProfile
) {
  // Check if email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  if (!email || !password || !firstName || !lastName) {
    throw Error("All required fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol"
    );
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
    rating,
    jobProfile,
  });

  return professional;
};

// Static login method
professionalSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

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

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
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
      "Make sure to use at least 8 characters, one upper case letter, a number and a symbol",
    ],
  },
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
});

// custom static method for signup

customerSchema.statics.signup = async function (
  profileImage,
  firstName,
  lastName,
  gender,
  email,
  password,
  phoneNumber,
  address,
  aboutMe
) {
  // Validation
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!email || !password || !firstName || !lastName || !gender) {
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

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const customer = await this.create({
    profileImage,
    firstName,
    lastName,
    gender,
    email,
    password: hash,
    phoneNumber,
    address,
    aboutMe,
  });

  return customer;
};

// static custom login method

customerSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const customer = await this.findOne({ email });

  if (!customer) {
    throw Error("Customer doesn't exist or incorrect email");
  }

  const match = await bcrypt.compare(password, customer.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return customer;
};

module.exports = mongoose.model("Customer", customerSchema);

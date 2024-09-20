// controllers/professionalController.js
const mongoose = require("mongoose");
const Professional = require("../schemas/Professional");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Login Professional
const loginProfessional = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professional = await Professional.login(email, password);

    // Create token
    const token = createToken(professional._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign up Professional
const signUpProfessional = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    email,
    password, // Make sure password is correctly passed here
    phoneNumber,
    address,
    aboutMe,
    jobProfile,
  } = req.body;

  let profileImage = req.file?.path || ""; // Use Cloudinary uploaded image path or an empty string if no image

  try {
    const professional = await Professional.signup(
      profileImage,
      firstName,
      lastName,
      gender,
      email,
      password, // Make sure password is passed here
      phoneNumber,
      address,
      aboutMe,
      jobProfile
    );

    // Create a JWT token
    const token = createToken(professional._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Professional by ID
const getProfessionalById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid professional ID" });
  }

  try {
    const professional = await Professional.findById(id);

    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Professional
const updateProfessional = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid professional ID" });
  }

  try {
    const professional = await Professional.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
  updateProfessional,
};

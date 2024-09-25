// controllers/professionalController.js
const mongoose = require("mongoose");
const Professional = require("../schemas/Professional");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

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

    res.status(200).json({
      email: professional.email,
      firstName: professional.firstName,
      profileImage: professional.profileImage,
      token,
    });
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
    rating,
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
      rating,
      jobProfile
    );

    // Create a JWT token
    const token = createToken(professional._id);
    res.status(200).json({
      email: professional.email,
      firstName: professional.firstName,
      profileImage: professional.profileImage,
      token,
    });
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
    const professional = await Professional.findById(id)
      .populate("rating")
      .populate("jobProfile.skill")
      .exec();

    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    // Calculate average rating
    if (professional.rating.length > 0) {
      const totalRating = professional.rating.reduce(
        (sum, feedback) => sum + feedback.rating,
        0
      );
      professional.averageRating = totalRating / professional.rating.length;
    }

    res.status(200).json(professional);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all Professionals
const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find({})
      .populate("rating")
      .populate("jobProfile.skill")
      .exec();

    if (!professionals || professionals.length === 0) {
      return res.status(404).json({ error: "No professionals found" });
    }

    // Optionally, calculate average rating for each professional
    professionals.forEach((professional) => {
      if (professional.rating.length > 0) {
        const totalRating = professional.rating.reduce(
          (sum, feedback) => sum + feedback.rating,
          0
        );
        professional.averageRating = totalRating / professional.rating.length;
      } else {
        professional.averageRating = 0;
      }
    });

    res.status(200).json(professionals);
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

const uploadProfessionalImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the professional exists before attempting to upload the image
    const professional = await Professional.findById(id);
    if (!professional) {
      return res.status(404).json({ message: "professional not found" });
    }

    // Check if the file was uploaded correctly by multer
    if (req.file && req.file.path) {
      // Update only the image field, avoiding validation of other fields
      professional.profileImage = req.file.path;
      await professional.save({ validateBeforeSave: false }); // Avoid validation for other fields like categoryId

      return res
        .status(200)
        .json({ message: "profileImage uploaded successfully", professional });
    } else {
      console.log(req.file); // Add this log to see what req.file looks like
      return res
        .status(422)
        .json({ message: "Invalid profileImage or no file uploaded" });
    }
  } catch (error) {
    console.error("Error while uploading professional profileImage:", error); // Log the error to the console
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
  getAllProfessionals,
  updateProfessional,
  uploadProfessionalImage,
};

// controllers/professionalController.js

const mongoose = require("mongoose");
const Professional = require("../schemas/Professional");
const Feedback = require("../schemas/Feedback");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

// Helper function to create JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// Utility function to recalculate the average rating
const recalculateAverageRating = async (profId) => {
  const feedbacks = await Feedback.find({ prof_id: profId });
  const totalRating = feedbacks.reduce(
    (sum, feedback) => sum + feedback.rating,
    0
  );
  const averageRating =
    feedbacks.length > 0 ? totalRating / feedbacks.length : 0;

  // Update the professional's average rating
  await Professional.findByIdAndUpdate(profId, {
    averageRating: averageRating,
  });
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
    password,
    phoneNumber,
    address,
    aboutMe,
    rating,
    jobProfile,
  } = req.body;

  const profileImage = req.file?.path || ""; // Use Cloudinary uploaded image path or an empty string if no image

  try {
    const professional = await Professional.signup(
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

const getProfessionalById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid professional ID" });
  }

  try {
    // Fetch the professional's details
    const professional = await Professional.findById(id)
      .populate({
        path: "jobProfile.skill",
        select: "name image",
      })
      .exec();

    if (!professional) {
      return res.status(404).json({ error: "Professional not found" });
    }

    // Fetch feedback for the professional to calculate the average rating
    const feedbacks = await Feedback.find({ prof_id: id });
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = feedbacks.length > 0 ? totalRating / feedbacks.length : 0;

    // Include the average rating in the response
    res.status(200).json({
      ...professional.toObject(), // Convert mongoose document to plain JS object
      averageRating: averageRating, // Add the calculated average rating
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Professionals by ServiceId
const getProfessionalsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    const professionals = await Professional.find({
      "jobProfile.skill": serviceId,
    })
      .select("-password")
      .populate("rating")
      .populate("jobProfile.skill")
      .exec();

    if (!professionals || professionals.length === 0) {
      return res
        .status(404)
        .json({ error: "No professionals found for this service" });
    }

    // Calculate average rating for each professional
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
    res.status(400).json({ error: error.message });
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

    // Calculate average rating for each professional
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

// Upload Professional Image (using Cloudinary)
const uploadProfessionalImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure the professional exists before attempting to upload the image
    const professional = await Professional.findById(id);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // Check if the file was uploaded correctly by multer
    if (req.file && req.file.path) {
      professional.profileImage = req.file.path;
      await professional.save({ validateBeforeSave: false });

      return res.status(200).json({
        message: "Profile image uploaded successfully",
        professional,
      });
    } else {
      return res
        .status(422)
        .json({ message: "Invalid profile image or no file uploaded" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  loginProfessional,
  signUpProfessional,
  getProfessionalById,
  getProfessionalsByService,
  getAllProfessionals,
  updateProfessional,
  uploadProfessionalImage,
};

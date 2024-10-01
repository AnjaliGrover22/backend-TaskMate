const mongoose = require("mongoose");

// Sub-schema for 'offered' section
const OfferedSchema = new mongoose.Schema({
  descriptionPara: { type: String, required: true },
  keypoints: [String], // Array of key points (keypoint1, keypoint2, etc.)
});

// Sub-schema for 'imageDescription' parts
const ImageDescriptionSchema = new mongoose.Schema({
  part1: {
    title: { type: String, required: true },
    descriptionPara: { type: String, required: true },
    image: { type: String }, // Cloudinary image URL for 'part1'
  },
  part2: {
    title: { type: String, required: true },
    descriptionPara: { type: String, required: true },
    image: { type: String }, // Cloudinary image URL for 'part2'
  },
  part3: {
    title: { type: String, required: true },
    descriptionPara: { type: String, required: true },
    image: { type: String }, // Cloudinary image URL for 'part3'
  },
});

// Sub-schema for 'why' section (no image field)
const WhySchema = new mongoose.Schema({
  descriptionPara: { type: String, required: true },
  keypoints: [String], // Array of key points (keypoint1, keypoint2, etc.)
});

// Main Service schema
const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Service name must be at least 2 characters long"],
    maxLength: [100, "Service name cannot be more than 100 characters long"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String }, // Main image for the service
  description: {
    offered: OfferedSchema, // Sub-document for the 'offered' section (no image)
    imageDescription: ImageDescriptionSchema, // Sub-document for the 'imageDescription' parts (with images)
    why: WhySchema, // Sub-document for the 'why' section (no image)
  },
});

module.exports = mongoose.model("Service", ServiceSchema);

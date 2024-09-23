const mongoose = require("mongoose");

const addJobModalSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },

  Date: {
    type: Date, //this will set later from calendly
    default: new Date("2024-10-10T10:00:00"), // Static default date
    required: false, // will overwrite it
  },
  country: {
    type: String,
    required: true, // Optional, can be set later
  },
  city: {
    type: String,
    required: true, // Optional, can be set later
  },
  description: {
    type: String, //used TEXT types for longer description
    required: false,
  },
  referenceImage: {
    type: String, // Store URL or path to the image
    required: false, //
  },
  chargesPerHour: {
    type: Number,
    required: true,
    min: [20, "Charges per hour must be at least 10"], // Minimum charge
    max: [100, "Charges per hour cannot exceed 200"], // Maximum charge
  },
});

module.exports = mongoose.model("AddJobModal", addJobModalSchema);

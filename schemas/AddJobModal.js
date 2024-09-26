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
  date: {
    type: Date,
    required: true, // Date is required
  },
  startTime: {
    type: Date, // Store start time as a date object
    required: true, // Make this required
  },
  endTime: {
    type: Date, // Store end time as a date object
    required: true, // Make this required
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String, //used TEXT types for longer description
    required: false,
  },
  referenceImage: {
    type: String, // Store URL or path to the image
    required: false,
  },
  chargesPerHour: {
    type: Number,
    required: true,
    min: [20, "Charges per hour must be at least 10"], // Minimum charge
    max: [100, "Charges per hour cannot exceed 200"], // Maximum charge
  },
});

module.exports = mongoose.model("AddJobModal", addJobModalSchema);

const mongoose = require("mongoose");

const addJobModalSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional", // Reference to the Professional schema
    required: true,
  },
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
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
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
  description: {
    type: String,
  },
  referenceImage: {
    type: String,
  },
  chargesPerHour: {
    type: Number,
    required: true,
    min: [10, "Charges per hour must be at least 10"],
    max: [100, "Charges per hour cannot exceed 100"],
  },
});

module.exports = mongoose.model("AddJobModal", addJobModalSchema);

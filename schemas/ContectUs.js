const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"], // Email validation
  },
  referenceImage: {
    type: String, // This will store the file path if an image is uploaded
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ContactUs", contactUsSchema);

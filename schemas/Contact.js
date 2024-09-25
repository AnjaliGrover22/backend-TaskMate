const mongoose = require("mongoose");
// Define a schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  uploadImage: {
    type: String, // URL or path to the profile image
  },
});

const Contact = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");
// Define a schema
const helpByUsProfessionalSchema = new mongoose.Schema({
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
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model(
  "HelpByUsProfessional",
  helpByUsProfessionalSchema
);

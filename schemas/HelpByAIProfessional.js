const mongoose = require("mongoose");

// Define a schema for HelpByAIProfessional chat message
const helpByAIProfessionalSchema = new mongoose.Schema({
  messages: [
    {
      role: {
        type: String,
        required: true,
        enum: ["system", "user", "assistant"],
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "HelpByAIProfessional",
  helpByAIProfessionalSchema
);

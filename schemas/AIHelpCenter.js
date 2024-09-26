const mongoose = require("mongoose");

// Define a schema for AIHelpCenter chat message
const AIHelpCenterSchema = new mongoose.Schema({
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

module.exports = mongoose.model("AIHelpCenter", AIHelpCenterSchema);

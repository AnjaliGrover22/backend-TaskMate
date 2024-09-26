const mongoose = require("mongoose");

// Define a schema for AIHelpCenter chat message
const AIHelpCenterSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ["user", "assistant"],
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AIHelpCenter", AIHelpCenterSchema);

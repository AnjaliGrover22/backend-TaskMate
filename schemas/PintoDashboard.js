const mongoose = require("mongoose");
const { Schema } = mongoose;

const PintoDashboardSchema = new Schema(
  {
    Prof_id: { type: String, required: true },
    jobId: { type: String, required: true },
  },
  {
    // timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("PintoDashboard", PintoDashboardSchema);

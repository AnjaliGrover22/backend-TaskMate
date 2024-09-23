const mongoose = require("mongoose");
const { Schema } = mongoose;

const PintoDashboardSchema = new Schema(
  {
    prof_id: { type: String, required: true },
    job_id: { type: String, required: true },
  },
  {
    // timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("PintoDashboard", PintoDashboardSchema);

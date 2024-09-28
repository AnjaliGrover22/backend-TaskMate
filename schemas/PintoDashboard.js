const mongoose = require("mongoose");
const { Schema } = mongoose;

const PintoDashboardSchema = new Schema({
  prof_id: { type: String, required: true },
  job_id: { type: String, required: true },
});

module.exports = mongoose.model("PintoDashboard", PintoDashboardSchema);

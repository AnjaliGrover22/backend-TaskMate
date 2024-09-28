const mongoose = require("mongoose");
const { Schema } = mongoose;

const PintoDashboardSchema = new Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional", // Reference to the Professional schema
    required: true,
  },
  job_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddJobModal", // Reference to the AddJobModal schema
    required: true,
  },
});

module.exports = mongoose.model("PintoDashboard", PintoDashboardSchema);

const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  cust_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  prof_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId, // Referencing the Job ID from your job schema
    ref: "AddJobModal",
    required: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
// schemas/Favourite.js
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
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // Reference to the Customer who made the booking
  cust_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  // Reference to the Professional providing the service
  prof_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  // Reference to the Service being booked
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },

  appointmentDateTime: { type: Date, default: Date.now },
  bookHr: { type: Number, required: true },
  addJobModel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddJobModal",
  },
  startTime: { type: Date, required: true },
  endtTime: { type: Date, required: true },
  description: { type: String, required: true },
  // Status of the booking (pending, confirmed, or cancelled)
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  // Information for bookings made on behalf of someone else
  bookingForOthers: {
    // Name of the person for whom the booking is made
    name: { type: String },
    // Address details of the person
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    // Contact information for the person
    phoneNumber: { type: String },
    email: { type: String },
  },
});

// Create and export the Booking model
module.exports = mongoose.model("Booking", bookingSchema);

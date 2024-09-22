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
  // Status of the booking (pending, confirmed, or cancelled)
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  // Information for bookings made on behalf of someone else
  bookingForOthers: {
    // Name of the person for whom the booking is made
    name: { type: String, required: true },
    // Address details of the person
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    // Contact information for the person
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
  },
});

// Create and export the Booking model
module.exports = mongoose.model("Booking", bookingSchema);

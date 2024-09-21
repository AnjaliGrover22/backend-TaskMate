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
  // Date of the appointment in DD.MM.YYYY format
  appointmentDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2}\.\d{2}\.\d{4}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid date format. Use DD.MM.YYYY`,
    },
  },
  // Time of the appointment in HH:mm format (24-hour clock)
  appointmentTime: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid time format. Use HH:mm`,
    },
  },
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

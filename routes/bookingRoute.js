// routes/bookingRoutes.js

const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getCustomerBookings,
  getProfessionalBookings,
} = require("../controllers/bookingController.js");

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getAllBookings);

// Get a specific booking by ID
router.get("/:id", getBookingById);

// Update a booking
router.put("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);

// Get bookings for a specific customer
router.get("/customer/:custId", getCustomerBookings);

// Get bookings for a specific professional
router.get("/professional/:profId", getProfessionalBookings);

module.exports = router;

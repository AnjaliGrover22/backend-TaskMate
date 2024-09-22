// controllers/bookingController.js

const Booking = require("../schemas/Booking");
const { isValidISODateString } = require("iso-datestring-validator");

// Helper function to validate UTC ISO date string
const isValidUTCISODateString = (dateString) => {
  if (!isValidISODateString(dateString)) {
    return false;
  }
  // Check if it's in UTC (ends with 'Z' or +00:00)
  return dateString.endsWith("Z") || dateString.endsWith("+00:00");
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { appointmentDateTime, ...otherFields } = req.body;

    if (!isValidUTCISODateString(appointmentDateTime)) {
      return res.status(400).json({
        message:
          "Invalid appointment date and time. Please provide a valid UTC ISO date string.",
      });
    }

    const newBooking = new Booking({
      ...otherFields,
      appointmentDateTime: new Date(appointmentDateTime),
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("cust_id", "name email")
      .populate("prof_id", "name email")
      .populate("service_id", "name price");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("cust_id", "name email")
      .populate("prof_id", "name email")
      .populate("service_id", "name price");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { appointmentDateTime, ...otherFields } = req.body;

    if (appointmentDateTime && !isValidUTCISODateString(appointmentDateTime)) {
      return res.status(400).json({
        message:
          "Invalid appointment date and time. Please provide a valid UTC ISO date string.",
      });
    }

    const updateData = {
      ...otherFields,
      ...(appointmentDateTime && {
        appointmentDateTime: new Date(appointmentDateTime),
      }),
    };

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a specific customer
exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ cust_id: req.params.custId })
      .populate("prof_id", "name email")
      .populate("service_id", "name price");
    if (!bookings)
      return res.status(404).json({ message: "Booking not found" });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get bookings for a specific professional
exports.getProfessionalBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ prof_id: req.params.profId })
      .populate("cust_id", "name email")
      .populate("service_id", "name price");
    if (!bookings)
      return res.status(404).json({ message: "Booking not found" });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

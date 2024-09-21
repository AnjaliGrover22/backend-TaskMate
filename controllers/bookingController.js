const Booking = require("../schemas/Booking"); // Import the Booking schema
const moment = require("moment-timezone"); // Import moment-timezone for date/time handling

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body; // Get booking data from request body

    // Parse and validate the appointment date and time
    const appointmentDateTime = moment.tz(
      `${bookingData.appointmentDate} ${bookingData.appointmentTime}`,
      "DD.MM.YYYY HH:mm",
      "Europe/Berlin"
    );

    // Check if the parsed date/time is valid
    if (!appointmentDateTime.isValid()) {
      return res
        .status(400)
        .json({ error: "Invalid appointment date or time" });
    }

    // Check if the appointment is on a weekday (not Saturday or Sunday)
    if (appointmentDateTime.day() === 0 || appointmentDateTime.day() === 6) {
      return res
        .status(400)
        .json({ error: "Appointments are only available on weekdays" });
    }

    // Check if the appointment is within business hours (8:00 AM to 6:00 PM)
    const hour = appointmentDateTime.hour();
    const minute = appointmentDateTime.minute();
    if (hour < 8 || (hour === 18 && minute > 0) || hour > 18) {
      return res.status(400).json({
        error: "Appointments are only available between 08:00 and 18:00",
      });
    }

    // Check if the appointment is in the future
    if (appointmentDateTime.isBefore(moment())) {
      return res
        .status(400)
        .json({ error: "Appointment date and time must be in the future" });
    }

    // Create a new Booking instance and save it to the database
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json(newBooking); // Respond with the created booking
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle any errors
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings and populate referenced fields
    const bookings = await Booking.find()
      .populate("cust_id")
      .populate("prof_id")
      .populate("service_id");
    res.status(200).json(bookings); // Respond with all bookings
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle any errors
  }
};

// Get a single booking by ID
exports.getBookingById = async (req, res) => {
  try {
    // Find a booking by ID and populate referenced fields
    const booking = await Booking.findById(req.params.id)
      .populate("cust_id")
      .populate("prof_id")
      .populate("service_id");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking); // Respond with the found booking
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { appointmentDate, appointmentTime, ...updateData } = req.body;

    // If date or time is being updated, validate them
    if (appointmentDate && appointmentTime) {
      const appointmentDateTime = moment.tz(
        `${appointmentDate} ${appointmentTime}`,
        "DD.MM.YYYY HH:mm",
        "Europe/Berlin"
      );

      // Add validated date and time to update data
      if (!appointmentDateTime.isValid()) {
        return res
          .status(400)
          .json({ error: "Invalid appointment date or time" });
      }

      updateData.appointmentDate = appointmentDate;
      updateData.appointmentTime = appointmentTime;
    }

    // Find the booking by ID and update it
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json(updatedBooking); // Respond with the updated booking
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    // Find the booking by ID and delete it
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bookings for a specific customer
exports.getCustomerBookings = async (req, res) => {
  try {
    // Find all bookings for a specific customer and populate referenced fields
    const bookings = await Booking.find({
      cust_id: req.params.customerId,
    })
      .populate("prof_id")
      .populate("service_id");
    res.status(200).json(bookings); // Respond with the customer's bookings
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bookings for a specific professional
exports.getProfessionalBookings = async (req, res) => {
  try {
    // Find all bookings for a specific professional and populate referenced fields
    const bookings = await Booking.find({
      prof_id: req.params.professionalId,
    })
      .populate("cust_id")
      .populate("service_id");
    res.status(200).json(bookings); // Respond with the professional's bookings
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/bookingController.js
const mongoose = require("mongoose");

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
    const { appointmentDateTime, startTime, endTime, ...otherFields } =
      req.body;

    // Check if appointmentDateTime is a valid UTC ISO date string
    if (!isValidUTCISODateString(appointmentDateTime)) {
      return res.status(400).json({
        message:
          "Invalid appointment date and time. Please provide a valid UTC ISO date string.",
      });
    }

    // Convert startTime and endTime to Date objects
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate that startTime is less than endTime
    if (start >= end) {
      return res.status(400).json({
        message: "Start time must be earlier than end time.",
      });
    }

    // Calculate the booking hours (difference between end and start in hours)
    const bookingHours = (end - start) / (1000 * 60 * 60); // Difference in milliseconds, convert to hours

    // Round the booking hours to the nearest integer
    const roundedBookingHours = Math.round(bookingHours);

    // Create a new booking object
    const newBooking = new Booking({
      ...otherFields,
      appointmentDateTime: new Date(appointmentDateTime),
      startTime: start,
      endTime: end,
      bookHr: roundedBookingHours, // Set the rounded booking hours
    });

    // Save the booking
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
      .populate("service_id", "name price")
      .populate("addJobModel_id");
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
      .populate("service_id", "name price")
      .populate("addJobModel_id");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const { appointmentDateTime, startTime, endTime, ...otherFields } =
      req.body;

    // Validate appointmentDateTime if provided
    if (appointmentDateTime && !isValidUTCISODateString(appointmentDateTime)) {
      return res.status(400).json({
        message:
          "Invalid appointment date and time. Please provide a valid UTC ISO date string.",
      });
    }

    // Prepare the update data object
    let updateData = {
      ...otherFields,
      ...(appointmentDateTime && {
        appointmentDateTime: new Date(appointmentDateTime),
      }),
    };

    // If startTime and endTime are provided, validate and calculate the booking hours
    if (startTime && endTime) {
      const start = new Date(startTime);
      const end = new Date(endTime);

      // Ensure start time is before end time
      if (start >= end) {
        return res.status(400).json({
          message: "Start time must be earlier than end time.",
        });
      }

      // Calculate booking hours
      const bookingHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
      const roundedBookingHours = Math.round(bookingHours); // Round to nearest hour

      // Add startTime, endTime, and bookHr to the updateData
      updateData = {
        ...updateData,
        startTime: start,
        endTime: end,
        bookHr: roundedBookingHours,
      };
    }

    // Update the booking in the database
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Return the updated booking
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
      .populate("service_id", "name price")
      .populate("addJobModel_id");
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
      .populate("service_id", "name price")
      .populate("addJobModel_id");
    if (!bookings)
      return res.status(404).json({ message: "Booking not found" });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfessionalEarnings = async (req, res) => {
  try {
    const bookings = await Booking.find({ prof_id: req.params.profId })
      .populate({
        path: "addJobModel_id",
        select: "chargesPerHour", // Ensure we only fetch the necessary field
      })
      .select("appointmentDateTime bookHr addJobModel_id");

    // Check if bookings exist
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this professional" });
    }

    // Calculate earnings
    const earningsByDate = bookings.reduce((acc, booking) => {
      const date = new Date(booking.appointmentDateTime).toLocaleDateString(
        "en-GB"
      );

      // Check if the related addJobModel exists and has a valid chargesPerHour field
      const chargesPerHour = booking.addJobModel_id?.chargesPerHour;
      if (chargesPerHour === undefined) {
        console.warn(`Missing chargesPerHour for booking: ${booking._id}`);
        return acc; // Skip this booking if chargesPerHour is missing
      }

      const earnings = chargesPerHour * booking.bookHr;

      if (acc[date]) {
        acc[date] += earnings;
      } else {
        acc[date] = earnings;
      }

      return acc;
    }, {});

    if (Object.keys(earningsByDate).length === 0) {
      return res.status(404).json({ message: "No earnings data available" });
    }

    res.json(earningsByDate);
  } catch (error) {
    console.error("Error in getProfessionalEarnings:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const formatTimeRange = (startTime, endTime) => {
  if (!startTime || !endTime) return "N/A";

  const formatTime = (time) => {
    const date = new Date(time);
    return date
      .toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const formattedStart = formatTime(startTime);
  const formattedEnd = formatTime(endTime);

  return `${formattedStart} - ${formattedEnd}`;
};

//Get bookings cards for a specific customer
exports.getCustomerBookingscards = async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Validate customerId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const bookings = await Booking.find(
      { cust_id: customerId },
      "prof_id service_id appointmentDateTime startTime endTime bookHr status"
    )
      .populate("prof_id", "profileImage firstName lastName _id")
      .populate("service_id", "name")
      .populate("addJobModel_id", "date")
      .lean();

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this customer" });
    }

    const formattedBookings = bookings.map((booking) => ({
      id: booking._id,
      profileImage: booking.prof_id?.profileImage || "N/A",
      profId: booking.prof_id?._id || "N/A", // Ensure profId is mapped correctly
      professionalName: booking.prof_id
        ? `${booking.prof_id.firstName} ${booking.prof_id.lastName}`.trim()
        : "N/A",
      serviceName: booking.service_id?.name || "N/A",
      appointmentDate: booking.appointmentDateTime
        ? new Date(booking.appointmentDateTime).toDateString()
        : "N/A",
      schedule: formatTimeRange(booking.startTime, booking.endTime),
      date: booking.addJobModel_id.date
        ? new Date(booking.addJobModel_id.date).toDateString()
        : "N/A",
      bookingHours: booking.bookHr,
      status: booking.status,
      description: booking.description,
    }));

    res.json(formattedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};

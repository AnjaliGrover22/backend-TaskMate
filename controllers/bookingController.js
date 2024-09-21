const Booking = require("../schemas/Booking");
const moment = require("moment"); //install this package: npm install moment
const moment = require("moment-timezone"); // //install this package: npm install moment-timezone
const Customer = require("../schemas/Customer");

function validateAndParseDatetime(dateStr, timeStr) {
  const dateTime = moment.tz(
    `${dateStr} ${timeStr}`,
    "DD.MM.YYYY HH:mm",
    "Europe/Berlin"
  );

  if (!dateTime.isValid()) {
    throw new Error(
      "Invalid date or time format. Please use DD.MM.YYYY for date and HH:mm for time."
    );
  }

  if (dateTime.day() === 0 || dateTime.day() === 6) {
    throw new Error("Appointments are only available on weekdays.");
  }

  const hour = dateTime.hour();
  const minute = dateTime.minute();
  if (hour < 8 || (hour === 18 && minute > 0) || hour > 18) {
    throw new Error("Appointments are only available between 08:00 and 18:00.");
  }

  if (dateTime.isBefore(moment())) {
    throw new Error("Appointment date and time must be in the future.");
  }

  return dateTime.toDate(); // Convert to JavaScript Date object
}

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { appointment_date, appoint_time, ...otherBookingData } = req.body;

    // Validate and parse the date and time
    const appointmentDatetime = validateAndParseDatetime(
      appointment_date,
      appoint_time
    );

    // Create a new booking object with the parsed datetime
    const newBooking = new Booking({
      ...otherBookingData,
      appointment_datetime: appointmentDatetime,
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("cust_id")
      .populate("prof_id")
      .populate("service_id");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

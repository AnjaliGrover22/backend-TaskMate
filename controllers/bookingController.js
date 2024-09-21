const Booking = require("../schemas/Booking");
const moment = require("moment"); // // need to install this package: npm install moment
const Customer = require("../schemas/Customer");

function validateTimeFormat(timeStr) {
  const pattern = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
  return pattern.test(timeStr);
}
// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Parse the date string to a valid Date object
    const parsedDate = moment(
      bookingData.appointment_date,
      "DD.MM.YYYY"
    ).toDate();
    console.log("parsedDate ", parsedDate);
    if (!parsedDate || isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Please use DD.MM.YYYY" });
    }

    // Validate appoint_time
    if (!validateTimeFormat(bookingData.appoint_time)) {
      return res.status(400).json({
        error: "Invalid time format. Please use HH:mm (24-hour format)",
      });
    }

    bookingData.appointment_date = parsedDate;

    const newBooking = new Booking(bookingData);
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

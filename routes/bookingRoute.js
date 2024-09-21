// Import the Express framework
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the booking controller which contains the logic for handling booking-related requests
const bookingController = require("../controllers/bookingController");

// Define routes and associate them with controller functions

// POST route to create a new booking
// When a POST request is made to '/bookings', the createBooking function from the controller is called
router.post("/bookings", bookingController.createBooking);

// GET route to retrieve all bookings
// When a GET request is made to '/bookings', the getAllBookings function from the controller is called
router.get("/bookings", bookingController.getAllBookings);

// GET route to retrieve a specific booking by its ID
// When a GET request is made to '/bookings/:id', the getBookingById function from the controller is called
// The :id in the path is a route parameter that will be passed to the controller function
router.get("/bookings/:id", bookingController.getBookingById);

// PUT route to update a specific booking
// When a PUT request is made to '/bookings/:id', the updateBooking function from the controller is called
// This route is used to update an existing booking
router.put("/bookings/:id", bookingController.updateBooking);

// DELETE route to delete a specific booking
// When a DELETE request is made to '/bookings/:id', the deleteBooking function from the controller is called
router.delete("/bookings/:id", bookingController.deleteBooking);

// GET route to retrieve all bookings for a specific customer
// When a GET request is made to '/customer-bookings/:customerId', the getCustomerBookings function is called
// This route is used to get all bookings associated with a particular customer
router.get(
  "/customer-bookings/:customerId",
  bookingController.getCustomerBookings
);

// GET route to retrieve all bookings for a specific professional
// When a GET request is made to '/professional-bookings/:professionalId', the getProfessionalBookings function is called
// This route is used to get all bookings associated with a particular professional
router.get(
  "/professional-bookings/:professionalId",
  bookingController.getProfessionalBookings
);

// Export the router so it can be used in other parts of the application
module.exports = router;

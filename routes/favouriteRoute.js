// routes/favouriteRoutes.js

const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favouriteController");

// Add a new favourite
router.post("/", favouriteController.addFavourite);

// Get favourite by ID
router.get("/:id", favouriteController.getFavouriteById);

// Get all favourites
router.get("/", favouriteController.getAllFavourites);

// Get favourites by customer ID
router.get("/customer/:custId", favouriteController.getFavouritesByCustomer);

// Check if a professional is favourited by a customer
router.get("/check/:custId/:profId", favouriteController.checkFavourite);

// Remove a favourite by custId or Prof Id
//router.delete("/:custId/:profId", favouriteController.removeFavourite);

//Remove a favourite
router.delete("/:id", favouriteController.removeFavourite);

// Get all customers who have favourited a professional
router.get(
  "/professional/:profId/customers",
  favouriteController.getCustomersForProfessional
);

module.exports = router;

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

// Remove a favourite by ID
router.delete("/:id", favouriteController.removeFavourite);

module.exports = router;

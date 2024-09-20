const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favouriteController");

// Create a new favourite
router.post("/", favouriteController.createFavourite);

// Get all favourites
router.get("/", favouriteController.getAllFavourites);

// Get favourites by customer ID
router.get("/customer/:custId", favouriteController.getFavouritesByCustomer);

// Get favourites by professional ID
router.get(
  "/professional/:profId",
  favouriteController.getFavouritesByProfessional
);

// Delete a favourite
router.delete("/:id", favouriteController.deleteFavourite);

module.exports = router;

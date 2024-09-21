const express = require("express");
const router = express.Router();
const favouriteController = require("../controllers/favouriteController");

// Create a new favourite
router.post("/favourite", favouriteController.createFavourite);

// Get all favourites
router.get("/favourite", favouriteController.getAllFavourites);

// Get favourites by customer ID
router.get(
  "/favourite/customer/:cust_id",
  favouriteController.getFavouritesByCustomer
);

// Get favourites by professional ID
router.get(
  "/professional/:prof_id",
  favouriteController.getFavouritesByProfessional
);

// Delete a favourite
router.delete("/:id", favouriteController.deleteFavourite);

module.exports = router;

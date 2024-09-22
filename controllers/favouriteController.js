// controllers/favouriteController.js
const mongoose = require("mongoose");
const Favourite = require("../schemas/Favourite");

// Add a favourite
exports.addFavourite = async (req, res) => {
  try {
    const { cust_id, prof_id } = req.body;
    const newFavourite = new Favourite({ cust_id, prof_id });
    const savedFavourite = await newFavourite.save();
    res.status(201).json(savedFavourite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get favourite by Id
exports.getFavouriteById = async (req, res) => {
  try {
    const favourite = await Favourite.findById(req.params.id)
      .populate("cust_id", "name email")
      .populate("prof_id", "name email");
    if (!favourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }
    res.json(favourite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all favourites
exports.getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find()
      .populate("cust_id", "name email")
      .populate("prof_id", "name email");
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get favourites by customer ID
exports.getFavouritesByCustomer = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      cust_id: req.params.custId,
    }).populate("prof_id", "name email");
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if a professional is favourited by a customer
exports.checkFavourite = async (req, res) => {
  try {
    const { cust_id, prof_id } = req.params;
    const favourite = await Favourite.findOne({ cust_id, prof_id });
    res.json({ isFavourite: !!favourite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a favourite by Id
exports.removeFavourite = async (req, res) => {
  try {
    const favourite = await Favourite.findById(req.params.id);
    if (!favourite) {
      console.log(`Favourite with id ${req.params.id} not found`);
      return res.status(404).json({ message: "Favourite not found" });
    }
    const deletedFavourite = await Favourite.findByIdAndDelete(req.params.id);
    if (!deletedFavourite) {
      return res.status(500).json({ message: "Error deleting favorite" });
    }
    res.status(200).json({ message: "Favourite removed sucessfully" });
  } catch (error) {
    console.error("Error in getFavouriteById:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all customers who have favourited a professional
exports.getCustomersForProfessional = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      prof_id: req.params.profId,
    }).populate("cust_id", "name email");
    const customers = favourites.map((fav) => fav.cust_id);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

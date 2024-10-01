// controllers/favouriteController.js
const Favourite = require("../schemas/Favourite");

// Add a favourite (with service)
exports.addFavourite = async (req, res) => {
  try {
    const { cust_id, prof_id, service_id } = req.body;

    // Check if this favorite already exists
    const existingFavourite = await Favourite.findOne({
      cust_id,
      prof_id,
      service_id,
    });

    if (existingFavourite) {
      return res.status(400).json({ message: "Professional already in favorites" });
    }

    const newFavourite = new Favourite({ cust_id, prof_id, service_id });
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
      .populate("prof_id", "firstName lastName profileImage email")
      .populate("service_id", "name");

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
      .populate("prof_id", "firstName lastName profileImage email")
      .populate("service_id", "name");
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
    })
      .populate("prof_id", "firstName lastName profileImage")
      .populate("service_id", "name");

    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Check if a professional is favourited by a customer
exports.checkFavourite = async (req, res) => {
  try {
    const { cust_id, prof_id, service_id } = req.params;
    const favourite = await Favourite.findOne({ cust_id, prof_id, service_id });
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
      return res.status(404).json({ message: "Favourite not found" });
    }
    await Favourite.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (error) {
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



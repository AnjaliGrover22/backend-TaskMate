const Favourite = require("../schemas/Favourite");

// Create a new favourite
exports.createFavourite = async (req, res) => {
  try {
    const { cust_id, prof_id } = req.body;
    const newFavourite = new Favourite({ cust_id, prof_id });
    const savedFavourite = await newFavourite.save();
    res.status(201).json(savedFavourite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get all favourites
exports.getAllFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find()
      .populate("cust_id", "name email")
      .populate("prof_id", "name profession");
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
    }).populate("prof_id", "name profession");
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get favourites by professional ID
exports.getFavouritesByProfessional = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      prof_id: req.params.profId,
    }).populate("cust_id", "name customer");
    res.json(favourites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a favourite
exports.deleteFavourite = async (req, res) => {
  try {
    const deletedFavourite = await Favourite.findByIdAndDelete(req.params.id);
    if (!deletedFavourite) {
      return res.status(404).json({ message: "Favourite not found" });
    }
    res.json({ message: "Favourite deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

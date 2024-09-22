const Category = require("../schemas/Category");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error, unable to fetch categories" });
  }
};

// Upload a category with an image
const uploadCategory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    // Create a new category with the image URL from Cloudinary
    const category = new Category({
      name: req.body.name,
      image: req.file.path,
    });

    // Save the category to the database
    await category.save();

    // Return success response
    return res
      .status(201)
      .json({ message: "Category successfully created", category });
  } catch (error) {
    console.error(error);
    return resok
      .status(500)
      .json({ error: "Server error, unable to create category" });
  }
};

//get One Category by ID
const getOneCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (category) {
      return res.status(200).json({ category });
    }
    return res.status(404).json({ message: "Category not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to fetch categories" });
  }
};

// Helper function to escape special regex characters (like spaces)
const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//get One Category by name

const getOneCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;

    // Escape special characters in the name (e.g., spaces)
    const escapedName = escapeRegex(name);

    // Create a case-insensitive regular expression for partial matching
    const regex = new RegExp(escapedName, "i");

    const category = await Category.findOne({ name: regex });

    if (category) {
      return res.status(200).json({ category });
    }

    return res.status(404).json({ message: "Category not found" });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({
      error: error.message || "Server error, unable to fetch category",
    });
  }
};

module.exports = {
  getCategories,
  uploadCategory,
  getOneCategoryById,
  getOneCategoryByName,
};

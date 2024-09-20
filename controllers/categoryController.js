const Category = require("../schemas/Category"); // Your Category schema
const path = require("path");

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories
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
      return res.status(400).json({ error: "No image file uploaded" });
    }

    // Create a new category
    const category = new Category({
      name: req.body.name, // Category name from the request body
      image: req.file.path, // Image path from the uploaded file
    });

    // Save the new category
    await category.save();
    return res
      .status(201)
      .json({ msg: "Category successfully created", category });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server error, unable to upload category" });
  }
};

module.exports = {
  getCategories,
  uploadCategory,
};

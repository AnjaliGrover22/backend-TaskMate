const express = require("express");
const categoryRouter = express.Router();
const {
  getCategories,
  uploadCategory,
  getOneCategoryById,
  getOneCategoryByName,
} = require("../controllers/categoryController");
const upload = require("../services/upload"); // Import the multer upload

// Route to get all categories
categoryRouter.get("/", getCategories);

categoryRouter.post("/", upload.single("picture"), uploadCategory);

categoryRouter.get("/id/:id", getOneCategoryById);

categoryRouter.get("/name/:name", getOneCategoryByName);

module.exports = categoryRouter;

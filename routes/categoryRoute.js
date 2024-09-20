const express = require("express");
const categoryRouter = express.Router();
const {
  getCategories,
  uploadCategory,
} = require("../controllers/categoryController");
const upload = require("../services/upload"); // Import the multer upload

// Route to get all categories
categoryRouter.get("/", getCategories);

categoryRouter.post("/", upload.single("picture"), uploadCategory);

module.exports = categoryRouter;

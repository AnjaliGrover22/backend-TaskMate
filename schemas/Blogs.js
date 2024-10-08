const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String], // Array of strings for categories or tags (e.g., "Home Improvement", "Tips")
  },
  coverImage: {
    type: String, // URL or path to the cover image
  },
  excerpt: {
    type: String, // Short description or excerpt for the blog
    trim: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);

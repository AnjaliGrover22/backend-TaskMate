const express = require("express");
const blogRouter = express.Router();
const upload = require("../services/upload"); // Assuming you have an upload service to handle file uploads

const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
} = require("../controllers/blogsController");

// Route to create a new blog post (with optional image upload)
blogRouter.post("/", upload.single("coverImage"), createBlogPost);

// Route to get all blog posts
blogRouter.get("/", getAllBlogPosts);

// Route to get a single blog post by ID
blogRouter.get("/:id", getBlogPostById);

// Route to update a blog post by ID (with optional image upload)
blogRouter.put("/:id", upload.single("coverImage"), updateBlogPostById);

// Route to delete a blog post by ID
blogRouter.delete("/:id", deleteBlogPostById);

module.exports = blogRouter;

const Blog = require("../schemas/Blogs");

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content, author, tags, excerpt } = req.body;
    let coverImage = req.file ? req.file.path : null;

    const newBlogPost = await Blog.create({
      title,
      content,
      author,
      tags,
      coverImage,
      excerpt,
    });

    res.status(201).json({ message: "Blog post created successfully", blog: newBlogPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by ID
const updateBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, tags, excerpt } = req.body;

    let coverImage = req.file ? req.file.path : null;

    const updateData = {
      title,
      content,
      author,
      tags,
      coverImage,
      excerpt,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post by ID
const deleteBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
};

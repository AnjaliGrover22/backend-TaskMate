const mongoose = require("mongoose");
const { Schema } = mongoose;

const Category = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "Category length must be atleast  20 characters "],
    maxLength: [50, "Category length must be maximum  50 characters "],
  },
  image: {
    type: String, // Store the URL or path of the image
    required: true,
  },
});

module.exports = mongoose.model("Category", Category);

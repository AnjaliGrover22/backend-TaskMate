const mongoose = require("mongoose");
const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    minLength: [10, "Question must be atleast 10 characters long."],
    maxLength: [500, "Question must be less than 500 characters long."],
  },
  answer: {
    type: String,
    required: true,
    minLength: [10, "Answer must be at least 10 characters long."],
    maxLength: [2000, "Answer must be less than 2000 characters long."],
  },
  audience: {
    type: String,
    enum: ["customer", "professional", "general"], // This will differentiate FAQs by audience
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FAQ", faqSchema);

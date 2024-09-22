const express = require("express");
const FAQrouter = express.Router();
const {
  getFAQs,
  getAFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = require("../controllers/faqController");

//  get all FAQs (filtered by audience)
FAQrouter.get("/", getFAQs);

//get one FAQ by Id
FAQrouter.get("/:id", getAFAQById);

// create a new FAQ
FAQrouter.post("/", createFAQ);

//  update a FAQ by ID
FAQrouter.put("/:id", updateFAQ);

// Delete a FAQ by ID
FAQrouter.delete("/:id", deleteFAQ);

module.exports = FAQrouter;

const FAQ = require("../schemas/FAQ");

//get FAQs
const getFAQs = async (req, res) => {
  try {
    const { audience } = req.query; // pass audience as a query parameter(e.g., ?audience=customer)

    let filter = {};
    if (audience) {
      filter.audience = audience;
    }

    const faqs = await FAQ.find(filter);

    return res.status(200).json({ faqs });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to fetch FAQs" });
  }
};

// Create a new FAQ
const createFAQ = async (req, res) => {
  try {
    const { question, answer, audience } = req.body;
    console.log("Received data:", req.body); // Log the incoming data

    // Input validation
    if (!question || !answer || !audience) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newFAQ = await FAQ.create({
      question,
      answer,
      audience,
    });

    return res.status(201).json({ faq: newFAQ });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to create FAQ" });
  }
};

//get single FAQ by ID

const getAFAQById = async (req, res) => {
  try {
    const { id } = req.params;

    const getFAQ = await FAQ.findById(id);

    if (!getFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    return res.status(200).json({ faq: getFAQ });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to update FAQ" });
  }
};

// Update a FAQ by ID
const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, audience } = req.body;

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      {
        question,
        answer,
        audience,
      },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    return res.status(200).json({ faq: updatedFAQ });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to update FAQ" });
  }
};

// Delete a FAQ by ID
const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    return res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, unable to delete FAQ" });
  }
};

module.exports = {
  getFAQs,
  getAFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
};

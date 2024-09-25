const Contact = require("../schemas/Contact");
// Handle form submission
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new contact document
    const contact = new Contact({ name, email, message });

    // Save the document to the database
    await contact.save();

    // Send a success response
    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Error submitting form" });
  }
};

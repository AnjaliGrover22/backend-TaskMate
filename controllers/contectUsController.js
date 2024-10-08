const ContactUs = require("../schemas/ContectUs");

// Create a new contact us entry
const createContactUsEntry = async (req, res) => {
  try {
    const { subject, email, message } = req.body;

    // Check if an image was uploaded
    let referenceImage = req.file ? req.file.path : null;

    const newEntry = await ContactUs.create({
      subject,
      email,
      referenceImage,
      message,
    });

    res.status(201).json({ message: "Contact us entry created successfully", entry: newEntry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all contact us entries
const getAllContactUsEntries = async (req, res) => {
  try {
    const entries = await ContactUs.find({});
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single contact us entry by ID
const getContactUsEntryById = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await ContactUs.findById(id);

    if (!entry) {
      return res.status(404).json({ message: "Contact us entry not found" });
    }

    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a contact us entry by ID
const deleteContactUsEntryById = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await ContactUs.findByIdAndDelete(id);

    if (!entry) {
      return res.status(404).json({ message: "Contact us entry not found" });
    }

    res.status(200).json({ message: "Contact us entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContactUsEntry,
  getAllContactUsEntries,
  getContactUsEntryById,
  deleteContactUsEntryById,
};

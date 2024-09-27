const HelpByUsProfessional = require("../schemas/HelpByUsProfessional");

// Create a new helpByUsProfessional
const createHelpByUsProfessional = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newHelpByUsProfessional = new Help({ name, email, message });

    if (req.file) {
      newHelpByUsProfessional.uploadImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    await newHelpByUsProfessional.save();
    res.status(201).json({
      message: "HelpByUsProfessional created successfully",
      helpByUsProfessional: newHelpByUsProfessional,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating helpByUsProfessional",
      error: error.message,
    });
  }
};

// Get all helpByUsProfessional
const getAllHelpByUsProfessionals = async (req, res) => {
  try {
    const helpByUsProfessionals = await HelpByUsProfessional.find();
    res.status(200).json(helpByUsProfessionals);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching helpByUsProfessionals",
      error: error.message,
    });
  }
};

// Get a single helpByUsProfessional by ID
const getHelpByUsProfessionalById = async (req, res) => {
  try {
    const helpByUsProfessional = await HelpByUsProfessional.findById(
      req.params.id
    );
    if (!helpByUsProfessional) {
      return res
        .status(404)
        .json({ message: "HelpByUsProfessional not found" });
    }
    res.status(200).json(helpByUsProfessional);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching helpByUsProfessional",
      error: error.message,
    });
  }
};

// Update a helpByUsProfessional
const updateHelpByUsProfessional = async (req, res) => {
  try {
    const updatedHelpByUsProfessional =
      await HelpByUsProfessional.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if (!updatedHelpByUsProfessional) {
      return res
        .status(404)
        .json({ message: "HelpByUsProfessional not found" });
    }
    res.status(200).json({
      message: "HelpByUsProfessional updated successfully",
      helpByUsProfessional: updatedHelpByUsProfessional,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating helpByUsProfessional",
      error: error.message,
    });
  }
};

// Delete a helpByUsProfessional
const deleteHelpByUsProfessional = async (req, res) => {
  try {
    const deletedHelpByUsProfessional =
      await HelpByUsProfessional.findByIdAndDelete(req.params.id);
    if (!deletedHelpByUsProfessional) {
      return res
        .status(404)
        .json({ message: "HelpByUsProfessional not found" });
    }
    res
      .status(200)
      .json({ message: "HelpByUsProfessional deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting helpByUsProfessional",
      error: error.message,
    });
  }
};

module.exports = {
  createHelpByUsProfessional,
  getAllHelpByUsProfessionals,
  getHelpByUsProfessionalById,
  updateHelpByUsProfessional,
  deleteHelpByUsProfessional,
};

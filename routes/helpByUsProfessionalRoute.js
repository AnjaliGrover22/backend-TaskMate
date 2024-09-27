const express = require("express");
const router = express.Router();
const helpByUsProfessionalController = require("../controllers/helpByUsProfessionalController");
const multer = require("multer");

// Configure multer for handling file uploads
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
});

// Create a new helpByUsProfessional
router.post(
  "/",
  upload.single("uploadImage"),
  helpByUsProfessionalController.createHelpByUsProfessional
);

// Get all helpByUsProfessionals
router.get("/", helpByUsProfessionalController.getAllHelpByUsProfessionals);

// Get a single helpByUsProfessional by ID
router.get("/:id", helpByUsProfessionalController.getHelpByUsProfessionalById);

// Update a helpByUsProfessional
router.put("/:id", helpByUsProfessionalController.updateHelpByUsProfessional);

// Delete a helpByUsProfessional
router.delete(
  "/:id",
  helpByUsProfessionalController.deleteHelpByUsProfessional
);

module.exports = router;

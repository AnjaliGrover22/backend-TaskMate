const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const multer = require("multer");

// Configure multer for handling file uploads
const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
});

// Create a new contact
router.post("/", upload.single("uploadImage"), contactController.createContact);

// Get all contacts
router.get("/", contactController.getAllContacts);

// Get a single contact by ID
router.get("/:id", contactController.getContactById);

// Update a contact
router.put("/:id", contactController.updateContact);

// Delete a contact
router.delete("/:id", contactController.deleteContact);

module.exports = router;

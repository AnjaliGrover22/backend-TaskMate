const express = require("express");
const contactUsRouter = express.Router();
const upload = require("../services/upload"); // Middleware for handling image uploads

const {
  createContactUsEntry,
  getAllContactUsEntries,
  getContactUsEntryById,
  deleteContactUsEntryById,
} = require("../controllers/contectUsController");

// Route to create a new contact us entry
contactUsRouter.post("/", upload.single("referenceImage"), createContactUsEntry);

// Route to get all contact us entries
contactUsRouter.get("/", getAllContactUsEntries);

// Route to get a single contact us entry by ID
contactUsRouter.get("/:id", getContactUsEntryById);

// Route to delete a contact us entry by ID
contactUsRouter.delete("/:id", deleteContactUsEntryById);

module.exports = contactUsRouter;

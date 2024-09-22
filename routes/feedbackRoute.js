const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Create new feedback
router.post("/", feedbackController.createFeedback);

// Get all feedback
router.get("/", feedbackController.getAllFeedbacks);

// Get feedback by ID
router.get("/:id", feedbackController.getFeedbackById);

// Update feedback
router.put("/:id", feedbackController.updateFeedback);

// Delete feedback
router.delete("/:id", feedbackController.deleteFeedback);

// Get feedback by professional ID
router.get(
  "/professional/:profId",
  feedbackController.getFeedbackByProfessional
);

// Get feedback by customer ID
router.get("/customer/:custId", feedbackController.getFeedbackByCustomer);

module.exports = router;

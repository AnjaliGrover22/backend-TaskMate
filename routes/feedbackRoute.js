const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/feedback", feedbackController.createFeedback);
router.get("/feedback/:id", feedbackController.getFeedbackById);
router.put("/feedback/:id", feedbackController.updateFeedback);
router.delete("/feedback/:id", feedbackController.deleteFeedback);

module.exports = router;

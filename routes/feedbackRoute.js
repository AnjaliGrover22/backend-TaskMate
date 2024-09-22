const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getAllFeedbacks);
router.get("/:id", feedbackController.getFeedbackById);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.get(
  "/professional/:profId",
  feedbackController.getFeedbackByProfessional
);
router.get("/customer/:custId", feedbackController.getFeedbackByCustomer);

module.exports = router;

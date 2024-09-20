const Feedback = require("../schemas/Feedback");

// Create a new feedback
exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("booking_id")
      .populate("cust_id")
      .populate("prof_id");

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("categoryId");
    if (!feedbacks.length) {
      return res
        .status(200)
        .json({ message: "No feedbacks found in the database" });
    } else {
      return res.status(200).json(feedbacks);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Update feedback by ID
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

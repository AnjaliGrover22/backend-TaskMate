const Feedback = require("../schemas/Feedback");

// Create a new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { booking_id, cust_id, prof_id, rating, reviewText } = req.body;
    const newFeedback = new Feedback({
      booking_id,
      cust_id,
      prof_id,
      rating,
      reviewText,
    });
    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by professional ID
exports.getFeedbackByProfessional = async (req, res) => {
  try {
    const feedback = await Feedback.find({ prof_id: req.params.profId })
      .populate("booking_id")
      .populate("cust_id");
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback by customer ID
exports.getFeedbackByCustomer = async (req, res) => {
  try {
    const feedback = await Feedback.find({ cust_id: req.params.custId })
      .populate("booking_id")
      .populate("prof_id");
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

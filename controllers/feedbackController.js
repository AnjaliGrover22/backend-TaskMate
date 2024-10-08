const Feedback = require("../schemas/Feedback");
const Professional = require("../schemas/Professional");

// Utility function to recalculate the average rating
const recalculateAverageRating = async (profId) => {
  const feedbacks = await Feedback.find({ prof_id: profId });
  const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
  const averageRating = totalRating / feedbacks.length;

  // Update the professional's average rating
  await Professional.findByIdAndUpdate(profId, { averageRating: averageRating || 0 });
};

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

    // Recalculate and update the professional's average rating
    await recalculateAverageRating(prof_id);

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

    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("booking_id")
      .populate("cust_id")
      .populate("prof_id");

    if (!feedbacks.length) {
      return res.status(200).json({ message: "No feedbacks found" });
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

    // Recalculate and update the professional's average rating
    await recalculateAverageRating(updatedFeedback.prof_id);

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

    // Recalculate and update the professional's average rating
    await recalculateAverageRating(deletedFeedback.prof_id);

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

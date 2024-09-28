const PintoDashboard = require("../schemas/PintoDashboard");

// Create a new pin (pin job)
exports.createDashboard = async (req, res) => {
  try {
    const { professionalId, job_id } = req.body;

    // Validate the required fields
    if (!professionalId || !job_id) {
      return res.status(400).json({ message: "professionalId and job_id are required." });
    }

    const existingPin = await PintoDashboard.findOne({ professionalId, job_id });

    if (existingPin) {
      return res.status(400).json({ message: "Job is already pinned." });
    }

    const dashboard = new PintoDashboard({ professionalId, job_id });
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unpin job
exports.deleteDashboard = async (req, res) => {
  try {
    const { professionalId, job_id } = req.params;

    // Validate the required fields
    if (!professionalId || !job_id) {
      return res.status(400).json({ message: "professionalId and job_id are required." });
    }

    const dashboard = await PintoDashboard.findOneAndDelete({
      professionalId,
      job_id,
    });

    if (!dashboard) {
      return res.status(404).json({ message: "Job not found in pinned jobs." });
    }

    res.status(200).json({ message: "Job unpinned successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pinned jobs for a specific professional
exports.getPinnedJobsByProf = async (req, res) => {
  try {
    const { professionalId } = req.params;

    if (!professionalId) {
      return res.status(400).json({ message: "professionalId is required." });
    }

    // Fetch the pinned jobs for the professional and populate the necessary fields
    const pinnedJobs = await PintoDashboard.find({ professionalId })
      .populate({
        path: "job_id",
        populate: { path: "service_id" },  // This ensures that service details, including name, are populated
      })
      .populate("professionalId"); // Populate professional details

    res.status(200).json(pinnedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

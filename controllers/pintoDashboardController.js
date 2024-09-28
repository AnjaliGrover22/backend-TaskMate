const PintoDashboard = require("../schemas/PintoDashboard");

// Create a new pin (pin job)
exports.createDashboard = async (req, res) => {
  try {
    const { prof_id, job_id } = req.body;
    const existingPin = await PintoDashboard.findOne({ prof_id, job_id });

    if (existingPin) {
      return res.status(400).json({ message: "Job is already pinned." });
    }

    const dashboard = new PintoDashboard({ prof_id, job_id });
    await dashboard.save();
    res.status(201).json(dashboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unpin job
exports.deleteDashboard = async (req, res) => {
  try {
    const { prof_id, job_id } = req.body;

    const dashboard = await PintoDashboard.findOneAndDelete({ prof_id, job_id });

    if (!dashboard) {
      return res.status(404).json({ message: "Job not found in pinned jobs." });
    }

    res.status(200).json({ message: "Job unpinned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all pinned jobs for a specific professional
exports.getPinnedJobsByProf = async (req, res) => {
  try {
    const { prof_id } = req.params;
    const pinnedJobs = await PintoDashboard.find({ prof_id });
    res.status(200).json(pinnedJobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

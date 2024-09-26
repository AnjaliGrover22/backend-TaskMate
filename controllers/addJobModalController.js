const AddJobModal = require("../schemas/AddJobModal");

// Create new job card
const createNewJob = async (req, res) => {
  try {
    const {
      categoryId,
      service_id,
      date,
      startTime, // Start time
      endTime,   // End time
      country,
      city,
      description,
      chargesPerHour,
    } = req.body;

    // Check if an image was uploaded
    let referenceImage;
    if (req.file) {
      referenceImage = req.file.path; // Store the image path
    }

    // Create the new job in the database
    const newJob = await AddJobModal.create({
      categoryId,
      service_id,
      date,
      startTime, // Save start time
      endTime,   // Save end time
      country,
      city,
      description,
      referenceImage,
      chargesPerHour,
    });

    res.status(201).json({ message: "Job added successfully", job: newJob });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all job cards
const getAllJobs = async (req, res) => {
  try {
    const allJobs = await AddJobModal.find()
      .populate("categoryId")
      .populate("service_id");
    res.status(200).json(allJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one job card by Id
const getOneJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobById = await AddJobModal.findById(id)
      .populate("categoryId")
      .populate("service_id");
    if (!jobById) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(jobById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the job by Id
const UpdateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobExists = await AddJobModal.findById(id);

    if (!jobExists) {
      return res.status(404).json({ message: "Job does not exist" });
    }

    // Check if an image was uploaded
    let referenceImage;
    if (req.file) {
      referenceImage = req.file.path; // Store the new image path
    }

    // Prepare the update object
    const updateData = {
      ...req.body,
      ...(referenceImage && { referenceImage }), // Add referenceImage only if it exists
    };

    const updatedJob = await AddJobModal.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete the job by Id
const DeleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobById = await AddJobModal.findByIdAndDelete(id);

    if (!jobById) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewJob,
  getAllJobs,
  getOneJobById,
  UpdateJobById,
  DeleteJobById,
};

const AddJobModal = require("../schemas/AddJobModal");

//create new job card
const createNewJob = async (req, res) => {
  try {
    const {
      categoryId,
      service_id,
      date,
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

    const newJob = await AddJobModal.create({
      categoryId,
      service_id,
      date,
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

//get all job cards
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

//get one job card by Id
const getOneJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const JobById = await AddJobModal.findById(id);
    if (!JobById) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(JobById);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the job
const UpdateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobExists = await AddJobModal.findById(id);

    if (!jobExists) {
      return res.status(404).json({ message: "Job does not exist" });
    }

    const updatedJob = await AddJobModal.findByIdAndUpdate(
      id,
      req.body, // Pass req.body
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update the job
const DeleteJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const JobById = await AddJobModal.findByIdAndDelete(id);
    if (!JobById) return res.status(404).json({ message: "Job not found" });
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

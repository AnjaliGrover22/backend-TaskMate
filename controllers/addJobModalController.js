const AddJobModal = require("../schemas/AddJobModal");
const mongoose = require("mongoose");

// Create new job listing (only for professionals)
const createNewJob = async (req, res) => {
  try {
    // Ensure the user is a professional
    if (req.user.type !== "professional") {
      return res
        .status(403)
        .json({ message: "Access denied: Not a professional" });
    }

    const {
      categoryId,
      service_id,
      date,
      startTime,
      endTime,
      country,
      city,
      description,
      chargesPerHour,
    } = req.body;

    // Check if an image was uploaded
    let referenceImage = req.file ? req.file.path : null;

    // Create the new job in the database associated with the professional's ID
    const newJob = await AddJobModal.create({
      professionalId: req.user._id, // Get the professional's ID from req.user
      categoryId,
      service_id,
      date,
      startTime,
      endTime,
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

// Get jobs for the logged-in professional
const getJobsByProfessional = async (req, res) => {
  try {
    // Ensure the user is a professional
    if (req.user.type !== "professional") {
      return res
        .status(403)
        .json({ message: "Access denied: Not a professional" });
    }

    // Find jobs created by this professional
    const jobs = await AddJobModal.find({ professionalId: req.user._id })
      .populate("categoryId")
      .populate("service_id");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get professionals deatils by serviceId
const getProfessionalsForServiceWithDetails = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!serviceId || !mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    const jobs = await AddJobModal.find({ service_id: serviceId })
      .populate("service_id", "name")
      .populate(
        "professionalId",
        "firstName lastName profileImage averageRating"
      )
      .select(
        "professionalId  service_id country city  description chargesPerHour date startTime endTime "
      );

    const response = jobs.map((job) => ({
      profileImage: job.professionalId.profileImage,
      firstName: job.professionalId.firstName,
      lastName: job.professionalId.lastName,
      averageRating: job.professionalId.averageRating,
      serviceName: job.service_id.name,
      country: job.country,
      city: job.city,
      description: job.description,
      chargesPerHour: job.chargesPerHour,
      workingDate: job.date.toISOString().split("T")[0],
      // We then use the slice(0, 5) method to extract only the first 5 characters of the time string, which corresponds to the hours and minutes in the format "HH:MM".
      workingTime: {
        start: job.startTime.toTimeString().slice(0, 5),
        end: job.endTime.toTimeString().slice(0, 5),
      },
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single job by its ID
const getOneJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await AddJobModal.findById(id)
      .populate("categoryId")
      .populate("service_id");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job by its ID
const updateJobById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the job by ID
    const jobExists = await AddJobModal.findById(id);

    if (!jobExists) {
      return res.status(404).json({ message: "Job does not exist" });
    }

    // Check if an image was uploaded
    let referenceImage = req.file ? req.file.path : jobExists.referenceImage;

    // Update the job details
    const updateData = {
      ...req.body,
      referenceImage, // Update the reference image if provided
    };

    const updatedJob = await AddJobModal.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job by its ID
const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await AddJobModal.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNewJob,
  getJobsByProfessional,
  getProfessionalsForServiceWithDetails,
  getOneJobById,
  updateJobById,
  deleteJobById,
};

// Import the PintoDashboard model from the schemas directory
const PintoDashboard = require("../schemas/PintoDashboard");

// Controller function to create a new dashboard
exports.createDashboard = async (req, res) => {
  try {
    // Extract prof_id and job_id from the request body
    const { prof_id, job_id } = req.body;
    // Create a new PintoDashboard instance with the extracted data
    const dashboard = new PintoDashboard({ prof_id, job_id });
    // Save the new dashboard to the database
    await dashboard.save();
    // Respond with the created dashboard and a 201 (Created) status code
    res.status(201).json(dashboard);
  } catch (error) {
    // If an error occurs, respond with a 400 (Bad Request) status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get all dashboards
exports.getDashboards = async (req, res) => {
  try {
    // Retrieve all dashboards from the database
    const dashboards = await PintoDashboard.find();
    // Respond with the dashboards and a 200 (OK) status code
    res.status(200).json(dashboards);
  } catch (error) {
    // If an error occurs, respond with a 500 (Internal Server Error) status and the error message
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a single dashboard by its ID
exports.getDashboardById = async (req, res) => {
  try {
    // Find a dashboard by the ID provided in the request parameters
    const dashboard = await PintoDashboard.findById(req.params.id);
    // If no dashboard is found, respond with a 404 (Not Found) status
    if (!dashboard)
      return res.status(404).json({ message: "Dashboard not found" });
    // If found, respond with the dashboard and a 200 (OK) status code
    res.status(200).json(dashboard);
  } catch (error) {
    // If an error occurs, respond with a 500 (Internal Server Error) status and the error message
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a dashboard
exports.updateDashboard = async (req, res) => {
  try {
    // Extract prof_id and job_id from the request body
    const { prof_id, job_id } = req.body;
    // Find the dashboard by ID and update it with the new data
    // The { new: true } option returns the updated document
    const dashboard = await PintoDashboard.findByIdAndUpdate(
      req.params.id,
      { prof_id, job_id },
      { new: true }
    );
    // If no dashboard is found, respond with a 404 (Not Found) status
    if (!dashboard)
      return res.status(404).json({ message: "Dashboard not found" });
    // If updated successfully, respond with the updated dashboard and a 200 (OK) status code
    res.status(200).json(dashboard);
  } catch (error) {
    // If an error occurs, respond with a 400 (Bad Request) status and the error message
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a dashboard
exports.deleteDashboard = async (req, res) => {
  try {
    // Find the dashboard by ID and delete it
    const dashboard = await PintoDashboard.findByIdAndDelete(req.params.id);
    // If no dashboard is found, respond with a 404 (Not Found) status
    if (!dashboard)
      return res.status(404).json({ message: "Dashboard not found" });
    // If deleted successfully, respond with a success message and a 200 (OK) status code
    res.status(200).json({ message: "Dashboard deleted successfully" });
  } catch (error) {
    // If an error occurs, respond with a 500 (Internal Server Error) status and the error message
    res.status(500).json({ error: error.message });
  }
};

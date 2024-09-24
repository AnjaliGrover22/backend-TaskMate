const Service = require('../schemas/Service');
const Category = require('../schemas/Category');

// Create a new service with images for both the general image and imageDescription
const createService = async (req, res) => {
    try {
        const { name, categoryId, description } = req.body;

        // Check if the category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        // Handle general service image upload
        if (req.files['image']) {
            description.image = req.files['image'][0].path;  // Assign the general service image URL
        }

        // Handle image uploads for the imageDescription section
        if (req.files) {
            if (req.files['description[imageDescription][part1][image]']) {
                description.imageDescription.part1.image = req.files['description[imageDescription][part1][image]'][0].path;
            }
            if (req.files['description[imageDescription][part2][image]']) {
                description.imageDescription.part2.image = req.files['description[imageDescription][part2][image]'][0].path;
            }
            if (req.files['description[imageDescription][part3][image]']) {
                description.imageDescription.part3.image = req.files['description[imageDescription][part3][image]'][0].path;
            }
        }

        // Create and save the new service
        const newService = new Service({
            name,
            categoryId,
            image: description.image,
            description
        });

        const savedService = await newService.save();
        return res.status(201).json(savedService);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('categoryId');
        if (!services.length) {
            return res.status(200).json({ message: 'No services found' });
        }
        return res.status(200).json(services);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Get a single service by ID
const getOneService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id).populate('categoryId');
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Update an existing service
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, categoryId, description } = req.body;

        // Check if the category exists
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        // Handle general service image upload
        if (req.files['image']) {
            description.image = req.files['image'][0].path;  // Assign the general service image URL
        }

        // Handle image uploads for the imageDescription section
        if (req.files) {
            if (req.files['description[imageDescription][part1][image]']) {
                description.imageDescription.part1.image = req.files['description[imageDescription][part1][image]'][0].path;
            }
            if (req.files['description[imageDescription][part2][image]']) {
                description.imageDescription.part2.image = req.files['description[imageDescription][part2][image]'][0].path;
            }
            if (req.files['description[imageDescription][part3][image]']) {
                description.imageDescription.part3.image = req.files['description[imageDescription][part3][image]'][0].path;
            }
        }

        // Update the service
        const updatedService = await Service.findByIdAndUpdate(
            id,
            { name, categoryId, description },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json(updatedService);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a service by ID
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createService,
    getAllServices,
    getOneService,
    updateService,
    deleteService
};

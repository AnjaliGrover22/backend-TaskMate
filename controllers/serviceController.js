const Service = require('../schemas/Service');
const Category = require('../schemas/Category');
const cloudinary = require('cloudinary').v2;

// Get all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('categoryId');
        if (!services.length) {
            return res.status(200).json({ message: "No services found in the database" });
        } else {
            return res.status(200).json(services);
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get one service by ID
const getOneService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id).populate('categoryId');
        if (service) {
            return res.status(200).json({ service });
        }
        return res.status(404).json({ message: 'Service not found' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Create a new service
const createService = async (req, res) => {
    try {
        const { name, description, serviceCharge, categoryId } = req.body;

        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const newService = new Service({
            name,
            description,
            serviceCharge,
            categoryId,
        });

        const savedService = await newService.save();
        return res.status(201).json(savedService);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Update an existing service by ID
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, serviceCharge, categoryId } = req.body;

        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category does not exist' });
        }

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { name, description, serviceCharge, categoryId },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        } else {
            return res.status(200).json({ message: "Service updated successfully", updatedService });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a service by ID
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: 'Service not found' });
        } else {
            return res.status(200).json({ message: 'Service deleted successfully', deletedService });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Upload service image
const uploadServiceImage = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (req.file && req.file.path) {
            service.image = req.file.path;
            await service.save({ validateBeforeSave: false });
            return res.status(200).json({ message: 'Image uploaded successfully', service });
        } else {
            return res.status(422).json({ message: 'Invalid image or no file uploaded' });
        }
    } catch (error) {
        console.error('Error while uploading service image:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllServices,
    getOneService,
    createService,
    updateService,
    deleteService,
    uploadServiceImage,
};

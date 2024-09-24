const express = require('express');
const upload = require('../services/upload');  // Multer configuration for handling file uploads
const {
    createService,
    getAllServices,
    getOneService,
    updateService,
    deleteService
} = require('../controllers/serviceController');  // Import controller functions

const serviceRouter = express.Router();

// Route for creating a service with image uploads for both general image and imageDescription parts
serviceRouter.route('/')
    .post(upload.fields([
        { name: 'image', maxCount: 1 },  // Upload for the general service image
        { name: 'description[imageDescription][part1][image]', maxCount: 1 },  // Upload for 'part1' image in imageDescription
        { name: 'description[imageDescription][part2][image]', maxCount: 1 },  // Upload for 'part2' image in imageDescription
        { name: 'description[imageDescription][part3][image]', maxCount: 1 },  // Upload for 'part3' image in imageDescription
    ]), createService);

// Route to get all services
serviceRouter.route('/')
    .get(getAllServices);

// Route to get, update, and delete a service by ID
serviceRouter.route('/:id')
    .get(getOneService)
    .put(upload.fields([
        { name: 'image', maxCount: 1 },  // Upload for the general service image
        { name: 'description[imageDescription][part1][image]', maxCount: 1 },
        { name: 'description[imageDescription][part2][image]', maxCount: 1 },
        { name: 'description[imageDescription][part3][image]', maxCount: 1 },
    ]), updateService)
    .delete(deleteService);

module.exports = serviceRouter;

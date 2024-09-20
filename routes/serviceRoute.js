const express = require('express');
const upload = require('../services/upload');
const {
    getAllServices,
    getOneService,
    createService,
    updateService,
    deleteService,
    uploadServiceImage,
} = require('../controllers/serviceController');

const serviceRouter = express.Router();

serviceRouter.route('/')
    .get(getAllServices)
    .post(createService);

serviceRouter.route('/:id')
    .get(getOneService)
    .put(updateService)
    .delete(deleteService);

serviceRouter.route('/:id/uploadImage')
    .post(upload.single('picture'), uploadServiceImage);

module.exports = serviceRouter;

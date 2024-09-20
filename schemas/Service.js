const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Service name must be at least 2 characters long'],
        maxLength: [100, 'Service name cannot be more than 100 characters long'],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, 'Description must be at least 5 characters long'],
        maxLength: [500, 'Description cannot be more than 500 characters long'],
    },
    serviceCharge: {
        minimumCharge: {
            type: Number,
            required: true,
            min: [0, 'Minimum charge must be a positive number'],
        },
        maximumCharge: {
            type: Number,
            required: true,
            min: [0, 'Maximum charge must be a positive number'],
        },
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    image: {
        type: String,  // URL of the image
    },
});

module.exports = mongoose.model('Service', ServiceSchema);

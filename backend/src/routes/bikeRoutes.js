const express = require('express');
const { createBike, updateBike, getBikeById, deleteBike, fetchAllBikes, fetchBikeByCategory } = require('../controllers/bikeController');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const router = express.Router();

// Route to create a bike
router.post('/create', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, createBike);

// Route to update a bike by ID
router.patch('/update/:id', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, updateBike);

// Route to get a bike by ID
router.get('/:id', getBikeById);

// Route to delete a bike by ID
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), deleteBike);

// Route to get bike by category
router.get('/bike-category/:category', fetchBikeByCategory);

// Route to get all bikes
router.get('/', fetchAllBikes);

module.exports = router;

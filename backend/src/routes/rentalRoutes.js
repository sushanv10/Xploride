const express = require('express');
const { createRental, cancelRental, updateRentalStatus, getRentalDetailsWithUser, getAllRentals } = require('../controllers/rentalController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');
const router = express.Router();

// Create rental (user)
router.post('/rent/:bikeId', authMiddleware, authorizeRole('user'), cloudinaryUpload, uploadToCloudinary, createRental);

// Cancel rental (user)
router.patch('/cancel/:id', authMiddleware, authorizeRole('user'), cancelRental);

router.get('/rental/:id', authMiddleware, authorizeRole('admin'), getRentalDetailsWithUser);

// Update rental status (admin only)
router.patch('/status/:id', authMiddleware, authorizeRole('admin'), updateRentalStatus);

// Get all rentals (admin)
router.get('/all', authMiddleware, authorizeRole('admin'), getAllRentals);


module.exports = router;

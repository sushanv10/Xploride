const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');

router.post('/create', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, tourController.createTour);
router.get('/', tourController.getAllTours);
router.get('/:id', tourController.getTourById);
router.get('/category/:category', tourController.getToursByCategory);
router.patch('/update/:id', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, tourController.updateTour);
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), tourController.deleteTour);

module.exports = router;

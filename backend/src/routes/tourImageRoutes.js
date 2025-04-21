const express = require('express');
const router = express.Router();
const imageController = require('../controllers/tourImageController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');


router.post('/upload', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, imageController.addImage);
router.get('/:tour_id', imageController.getImages);
router.delete('/:id', authMiddleware, authorizeRole('admin'), imageController.deleteImage);

module.exports = router;

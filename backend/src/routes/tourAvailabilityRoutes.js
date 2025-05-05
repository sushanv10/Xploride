const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/tourAvailabilityController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

router.post('/add', authMiddleware, authorizeRole('admin'), availabilityController.addAvailability);
router.patch('/update/:id', authMiddleware, authorizeRole('admin'), availabilityController.updateTourAvailability);
router.get('/', availabilityController.fetchAllTourAvailability);
router.get('/:tour_id', availabilityController.fetchTourAvailabilityByTourId);
router.get("/availability/:id", availabilityController.getAvailabilityById);
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), availabilityController.deleteTourAvailability);

module.exports = router;

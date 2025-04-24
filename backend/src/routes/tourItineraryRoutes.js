const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/tourItineraryController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

router.post('/add', authMiddleware, authorizeRole('admin'), itineraryController.addItinerary);
router.patch('/update/:id', authMiddleware, authorizeRole('admin'), itineraryController.updateItinerary);
router.get('/', itineraryController.fetchAllTourItineraries);
router.get('/:tour_id', itineraryController.getItinerary);
router.get("/itinerary/:id", itineraryController.getItineraryById);
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), itineraryController.deleteItinerary);

module.exports = router;

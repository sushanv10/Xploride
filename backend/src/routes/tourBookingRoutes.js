const express = require('express');
const router = express.Router();
const { bookTour, cancelTourBooking, getAllTourBookings } = require('../controllers/tourBookingController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

// User routes
router.post('/book', authMiddleware, bookTour);
router.delete('/:id', authMiddleware, cancelTourBooking);

// Admin route
router.get('/', authMiddleware, authorizeRole(['admin']), getAllTourBookings);

module.exports = router;

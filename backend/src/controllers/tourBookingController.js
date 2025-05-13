const {
    createTourBooking,
    cancelTourBooking,
    getAllTourBookings
} = require('../models/tourBookingModel');

// Create booking
exports.bookTour = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { bikeId, availability_id, number_of_people, totalAmount } = req.body;

        if (!bikeId || !availability_id || !number_of_people || !totalAmount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const result = await createTourBooking(userId, bikeId, availability_id, number_of_people, totalAmount);

        if (result.notFound) {
            return res.status(404).json({ message: 'Tour date not found' });
        }

        if (result.overbooked) {
            return res.status(409).json({ message: 'Not enough slots available' });
        }

        res.status(201).json({ message: 'Tour booked successfully', bookingId: result.bookingId });
    } catch (error) {
        console.error('Error booking tour:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Cancel booking
exports.cancelTourBooking = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookingId = req.params.id;

        const result = await cancelTourBooking(bookingId, userId);

        if (result.notFound) {
            return res.status(404).json({ message: 'Booking not found, not authorized, or already cancelled' });
        }

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin: Get all bookings
exports.getAllTourBookings = async (req, res) => {
    try {
        const bookings = await getAllTourBookings();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

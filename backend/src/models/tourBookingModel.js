const db = require('../config/db');

// Create a new tour booking
exports.createTourBooking = async (userId, bikeId, availability_id, number_of_people, totalAmount) => {
    try {
        const [availability] = await db.execute(
            'SELECT available_slots FROM bike_tour_availability WHERE id = ?',
            [availability_id]
        );

        if (availability.length === 0) {
            return { notFound: true };
        }

        const slotsLeft = availability[0].available_slots;

        if (slotsLeft < number_of_people) {
            return { overbooked: true };
        }

        // Create booking with status 'booked'
        const [result] = await db.execute(
            'INSERT INTO tour_bookings (userId, bikeId, availability_id, number_of_people, totalAmount, status) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, bikeId, availability_id, number_of_people, totalAmount,'booked']
        );

        // Update slots
        await db.execute(
            'UPDATE bike_tour_availability SET available_slots = available_slots - ? WHERE id = ?',
            [number_of_people, availability_id]
        );

        return { success: true, bookingId: result.insertId };
    } catch (error) {
        console.error('Error creating tour booking:', error);
        throw error;
    }
};

// Cancel a booking (status update instead of delete)
exports.cancelTourBooking = async (bookingId, userId) => {
    try {
        const [booking] = await db.execute(
            'SELECT number_of_people, availability_id, status FROM tour_bookings WHERE booking_id = ? AND userId = ?',
            [bookingId, userId]
        );

        if (booking.length === 0 || booking[0].status !== 'booked') {
            return { notFound: true };
        }

        const { number_of_people, availability_id } = booking[0];

        // Update status to 'cancelled'
        await db.execute(
            'UPDATE tour_bookings SET status = ? WHERE booking_id = ? AND userId = ?',
            ['cancelled', bookingId, userId]
        );

        // Restore slots
        await db.execute(
            'UPDATE bike_tour_availability SET available_slots = available_slots + ? WHERE id = ?',
            [number_of_people, availability_id]
        );

        return { success: true };
    } catch (error) {
        console.error('Error cancelling tour booking:', error);
        throw error;
    }
};

// Get all bookings with status
exports.getAllTourBookings = async () => {
    try {
        const [bookings] = await db.execute(
            `SELECT 
                tb.booking_id,
                tb.userId,
                tb.bikeId,
                tb.availability_id,
                tb.number_of_people,
                tb.totalAmount,
                tb.booking_date,
                tb.status,
                u.userName,
                u.email,
                b.bikeName,
                a.tour_date,
                a.available_slots
             FROM tour_bookings tb
             JOIN users u ON tb.userId = u.userId
             JOIN bikes b ON tb.bikeId = b.bikeId
             JOIN bike_tour_availability a ON tb.availability_id = a.id
             ORDER BY tb.booking_date DESC`
        );
        return bookings;
    } catch (error) {
        console.error('Error fetching all tour bookings:', error);
        throw error;
    }
};

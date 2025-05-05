const db = require('../config/db');

// Create rental with overlap check
exports.createRental = async (userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount) => {
    try {
        const [existingRentals] = await db.execute(
            `SELECT * FROM bike_rentals 
             WHERE bikeId = ? 
             AND status IN ('approved', 'ongoing')
             AND NOT (rentEndDate < ? OR rentStartDate > ?)`,
            [bikeId, rentStartDate, rentEndDate]
        );

        if (existingRentals.length > 0) {
            return { overlap: true };
        }

        const [result] = await db.execute(
            `INSERT INTO bike_rentals (userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount]
        );

        return { overlap: false, result };
    } catch (error) {
        console.error("Error creating rental:", error);
        throw error;
    }
};

// Cancel booking by ID and user
exports.cancelRental = async (rentalId, userId) => {
    try {
        const [result] = await db.execute(
            `UPDATE bike_rentals 
             SET status = 'cancelled' 
             WHERE rentalId = ? AND userId = ? AND status = 'pending'`,
            [rentalId, userId]
        );
        return result;
    } catch (error) {
        console.error("Error cancelling rental:", error);
        throw error;
    }
};

// Get rental by rentalId with user details
exports.getRentalByIdWithUser = async (rentalId) => {
    try {
        const [result] = await db.execute(
            `SELECT 
                br.rentalId,
                br.bikeId,
                br.status,
                br.rentStartDate,
                br.rentEndDate,
                br.totalAmount,
                br.identificationImage,
                u.userName,
                u.email,
                u.contact
             FROM 
                bike_rentals br
             JOIN 
                users u ON br.userId = u.userId
             WHERE 
                br.rentalId = ?`,
            [rentalId]
        );
        return result[0]; // return a single rental object
    } catch (error) {
        console.error("Error fetching rental with user info:", error);
        throw error;
    }
};


// Update rental status (e.g., by admin or system)
exports.updateRentalStatus = async (req, res) => {
    try {
        const { rentalId } = req.params;
        const { status } = req.body;

        const allowedStatus = ['pending', 'approved', 'rejected', 'booked', 'ongoing', 'completed', 'cancelled'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided" });
        }

        const [rental] = await db.execute(
            `SELECT * FROM bike_rentals WHERE rentalId = ?`,
            [rentalId]
        );

        if (rental.length === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }

        await db.execute(
            `UPDATE bike_rentals SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE rentalId = ?`,
            [status, rentalId]
        );

        res.status(200).json({ message: "Rental status updated successfully", rentalId, updatedStatus: status });

    } catch (error) {
        console.error("Error updating rental status:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

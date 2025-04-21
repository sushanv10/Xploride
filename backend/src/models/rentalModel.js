const db = require('../config/db');


exports.createRental = async (userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount) => {
    try {
        // Check for overlapping rentals (Only approved or ongoing)
        const [existingRentals] = await db.execute(`
            SELECT * FROM bike_rentals 
            WHERE bikeId = ? 
            AND status IN ('approved', 'ongoing')
            AND NOT (rentEndDate < ? OR rentStartDate > ?)
        `, [bikeId, rentStartDate, rentEndDate]);

        if (existingRentals.length > 0) {
            return { overlap: true };
        }

        // Insert rental with dynamic status
        const [result] = await db.execute(`
            INSERT INTO bike_rentals (userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount]);

        return { overlap: false, result };
    } catch (error) {
        console.error("Error creating rental:", error);
        throw error;
    }
};


// Cancel booking by ID and user
exports.cancelRental = async (rentalId, userId) => {
    try {
        const [result] = await db.execute(`
            UPDATE bike_rentals 
            SET status = 'cancelled' 
            WHERE rentalId = ? AND userId = ? AND status = 'approved',
        `, [rentalId, userId]);
        return result;
    } catch (error) {
        console.error("Error cancelling rental:", error);
        throw error;
    }
};

// // Update rental status manually (e.g., admin or automated system)
// exports.updateRentalStatus = async (rentalId, status) => {
//     try {
//         const [result] = await db.execute(`
//             UPDATE bike_rentals 
//             SET status = ?, updated_at = CURRENT_TIMESTAMP 
//             WHERE rentalId = ?
//         `, [status, rentalId]);
//         return result;
//     } catch (error) {
//         console.error("Error updating rental status:", error);
//         throw error;
//     }
// };

exports.updateRentalStatus = async (req, res) => {
    try {
        const { rentalId } = req.params;
        const { status } = req.body;

        const allowedStatus = ['pending', 'approved', 'rejected', 'booked', 'ongoing', 'completed', 'cancelled'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status provided" });
        }

        const [rental] = await db.execute(`SELECT * FROM bike_rentals WHERE rentalId = ?`, [rentalId]);

        if (rental.length === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }

        await db.execute(`UPDATE bike_rentals SET status = ? WHERE rentalId = ?`, [status, rentalId]);

        res.status(200).json({ message: "Rental status updated successfully", rentalId, updatedStatus: status });

    } catch (error) {
        console.error("Error updating rental status:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

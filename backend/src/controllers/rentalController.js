const { createRental, cancelRental, updateRentalStatus } = require('../models/rentalModel');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');
const db = require('../config/db');


exports.createRental = async (req, res) => {
    try {
        uploadToCloudinary(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            const userId = req.user.userId;
            const bikeId = req.params.bikeId;
            const { rentStartDate, rentEndDate, status } = req.body;

            if (!rentStartDate || !rentEndDate || !status || !req.file?.cloudinaryUrl) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const identificationImage = req.file.cloudinaryUrl;

            const [bikeDetails] = await db.execute(`SELECT price FROM bikes WHERE bikeId = ?`, [bikeId]);

            if (bikeDetails.length === 0) {
                return res.status(404).json({ message: "Bike not found." });
            }

            const rentalPricePerDay = bikeDetails[0].price;
            const startDate = new Date(rentStartDate);
            const endDate = new Date(rentEndDate);
            const durationInDays = (endDate - startDate) / (1000 * 3600 * 24);

            if (durationInDays < 1) {
                return res.status(400).json({ message: "Rental duration must be at least 1 day." });
            }

            const totalAmount = rentalPricePerDay * durationInDays;

            const result = await createRental(userId, bikeId, rentStartDate, rentEndDate, status, identificationImage, totalAmount);

            if (result.overlap) {
                return res.status(409).json({ message: "This bike is already booked for the selected dates" });
            }

            res.status(201).json({
                message: "Bike rented successfully",
                rentalId: result.result.insertId,
                userId,
                bikeId,
                status,
                identificationImage,
                totalAmount
            });
        });
    } catch (error) {
        console.error("Error creating rental:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// Cancel rental by user
exports.cancelRental = async (req, res) => {
    try {
        const userId = req.user.id;
        const rentalId = req.params.id;

        const result = await cancelRental(rentalId, userId);

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "Unable to cancel. Rental not found or already cancelled/started." });
        }

        res.status(200).json({ message: "Rental cancelled successfully" });
    } catch (error) {
        console.error("Cancel rental error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Admin updates rental status
exports.updateRentalStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const rentalId = req.params.id;

        const result = await updateRentalStatus(rentalId, status);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Rental not found" });
        }

        res.status(200).json({ message: "Rental status updated" });
    } catch (error) {
        console.error("Update rental status error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

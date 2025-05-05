const availabilityModel = require('../models/tourAvailabilityModel');

// Add Itinerary
exports.addAvailability = async (req, res) => {
    const { tour_id, available_date, available_slots, availability_status, end_date } = req.body;

    // Basic validation
    if (!tour_id || !available_date || !available_slots || !availability_status || !end_date) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields are required"
        });
    }

    try {
        const result = await availabilityModel.addTourAvailability(
            tour_id, available_date, available_slots, availability_status, end_date
        );

        res.status(201).json({ 
            success: true,
            message: "Tour Availability added successfully",
            itinerary: {
                id: result.insertId,  // Use insertId from DB
                tour_id,
                available_date, 
                available_slots, 
                availability_status,
                end_date
            }
        });

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to add itinerary", 
            error: err 
        });
    }
};

// Get all tours
exports.fetchAllTourAvailability = async (_, res) => {
    try {
        const tourAvailability = await availabilityModel.getAllTourAvailability();

        if(tourAvailability.length === 0){
            return res.status(404).json({message: "No tour tour Availability found"});
        }

        return res.status(200).json({tourAvailability});
    } catch (error) {
        console.log("Error retrieving tour:", error);
        return res.status(500).json({message: "Server Error"});
    }
};

// Get Itinerary by Tour ID
exports.fetchTourAvailabilityByTourId = async (req, res) => {
    try {
        const result = await availabilityModel.getTourAvailabilityByTourId(req.params.tour_id);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch Tour Availability", 
            error: err 
        });
    }
};

exports.getAvailabilityById = async (req, res) => {
    try {
        const result = await availabilityModel.getTourAvailabilityById(req.params.id);

        if (!result || result.length === 0) {
            return res.status(404).json({ success: false, message: "Tour Availability not found" });
        }

        res.status(200).json({ success: true, data: result });
        console.log("Fetching tour availability by ID:", req.params.id);

    } catch (error) {
        console.error("Error fetching tour availability by ID:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Update itinerary

exports.updateTourAvailability = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            tour_id,
            available_date, 
            available_slots, 
            availability_status,
            end_date
        } = req.body;

        if (!tour_id || !available_date || !available_slots || !availability_status || !end_date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedData = {
            tour_id: tour_id || null,
            available_date: available_date || null,
            available_slots: available_slots || null,
            availability_status: availability_status || null,
            end_date: end_date || null
        };

        const result = await availabilityModel.updateTourAvailabilityById(id, updatedData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tour Availability not found" });
        }

        return res.status(200).json({
            message: "Tour Availability updated successfully",
            tourAvailability: updatedData
        });

    } catch (error) {
        console.log("Error updating tour availability:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};



// Delete Itinerary
exports.deleteTourAvailability = async (req, res) => {
    try {
        await availabilityModel.deleteTourAvailabilityById(req.params.id);
        res.json({ success: true, message: "Tour Availability  deleted successfully" });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to delete Tour Availability ", 
            error: err 
        });
    }
};

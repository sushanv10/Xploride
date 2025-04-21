const ItineraryModel = require('../models/tourItineraryModel');

// Add Itinerary
exports.addItinerary = async (req, res) => {
    const { tour_id, day_number, title, description, accommodation, meals, distance, elevation } = req.body;

    // Basic validation
    if (!tour_id || !day_number || !title || !description || !accommodation || !meals || !distance || !elevation) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields are required"
        });
    }

    try {
        const result = await ItineraryModel.addItinerary(
            tour_id, day_number, title, description, accommodation, meals, distance, elevation
        );

        res.status(201).json({ 
            success: true,
            message: "Itinerary added successfully",
            itinerary: {
                id: result.insertId,  // Use insertId from DB, not req.params.id
                tour_id,
                day_number,
                title,
                description,
                accommodation,
                meals,
                distance,
                elevation
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

// Get Itinerary by Tour ID
exports.getItinerary = async (req, res) => {
    try {
        const result = await ItineraryModel.getItineraryByTourId(req.params.tour_id);
        res.json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch itinerary", 
            error: err 
        });
    }
};

// Delete Itinerary
exports.deleteItinerary = async (req, res) => {
    try {
        await ItineraryModel.deleteItineraryById(req.params.id);
        res.json({ success: true, message: "Itinerary deleted successfully" });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to delete itinerary", 
            error: err 
        });
    }
};

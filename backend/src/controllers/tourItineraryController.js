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

// Get all tours
exports.fetchAllTourItineraries = async (_, res) => {
    try {
        const tourItinerary = await ItineraryModel.getAllTourItineraries();

        if(tourItinerary.length === 0){
            return res.status(404).json({message: "No tour itinerary found"});
        }

        return res.status(200).json({tourItinerary});
    } catch (error) {
        console.log("Error retrieving tour:", error);
        return res.status(500).json({message: "Server Error"});
    }
};

// Get Itinerary by Tour ID
exports.getItinerary = async (req, res) => {
    try {
        const result = await ItineraryModel.getItineraryByTourId(req.params.tour_id);
        res.status(200).json({ success: true, data: result });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch itinerary", 
            error: err 
        });
    }
};

exports.getItineraryById = async (req, res) => {
    try {
        const result = await ItineraryModel.getItineraryById(req.params.id);

        if (!result || result.length === 0) {
            return res.status(404).json({ success: false, message: "Itinerary not found" });
        }

        res.status(200).json({ success: true, data: result });
        console.log("Fetching itinerary by ID:", req.params.id);

    } catch (error) {
        console.error("Error fetching itinerary by ID:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// Update itinerary
exports.updateItinerary = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            tour_id,
            day_number,
            title,
            description,
            accommodation,
            meals,
            distance,
            elevation
        } = req.body;

        if (!tour_id || !day_number || !title || !description || !accommodation || !meals || !distance || !elevation) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedData = {
            tour_id: tour_id || null,
            day_number: day_number || null,
            title: title || null,
            description: description || null,
            accommodation: accommodation || null,
            meals: meals || null,
            distance: distance || null,
            elevation: elevation || null
        };

        const result = await ItineraryModel.updateItineraryById(id, updatedData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        return res.status(200).json({
            message: "Itinerary updated successfully",
            itinerary: updatedData
        });

    } catch (error) {
        console.log("Error updating itinerary:", error);
        return res.status(500).json({ message: "Server Error" });
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

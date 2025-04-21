const db = require('../config/db');

// Add Itinerary
exports.addItinerary = async (tour_id, day_number, title, description, accommodation, meals, distance, elevation) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO bike_tour_itinerary (tour_id, day_number, title, description, accommodation, meals, distance, elevation) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [tour_id, day_number, title, description, accommodation, meals, distance, elevation]
        );
        return result;
    } catch (error) {
        console.error("Error inserting itinerary:", error);
        throw error;
    }
};

// Get Itinerary by Tour ID
exports.getItineraryByTourId = async (tour_id) => {
    const [itinerary] = await db.query("SELECT * FROM bike_tour_itinerary WHERE tour_id = ? ORDER BY day_number", [tour_id]);
    return itinerary;
};

// Delete Itinerary by ID
exports.deleteItineraryById = async (id) => {
    const [result] = await db.execute("DELETE FROM bike_tour_itinerary WHERE id = ?", [id]);
    return result;
};

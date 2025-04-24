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

exports.getAllTourItineraries = async () => {
    try {
        const [tourItineraries] = await db.query(
            'SELECT * FROM bike_tour_itinerary'
        );

        return tourItineraries;
    } catch (error) {
        console.log("Error retrieving bike tourItineraries:", error);
        throw error;
    }
};

// Get Itinerary by Tour ID
exports.getItineraryByTourId = async (tour_id) => {
    const [itinerary] = await db.query("SELECT * FROM bike_tour_itinerary WHERE tour_id = ? ORDER BY day_number", [tour_id]);
    return itinerary;
};

exports.getItineraryById = async (id) => {
    const [itinerary] =await db.query("SELECT * FROM bike_tour_itinerary WHERE id = ?",[id]);
    return itinerary
}

// Update itinerary by ID
exports.updateItineraryById = async (id, updateData) => {
    if (!id) {
        throw new Error("Itinerary ID is undefined or null");
    }

    const {
        tour_id,
        day_number,
        title,
        description,
        accommodation,
        meals,
        distance,
        elevation
    } = updateData;

    try {
        const [result] = await db.execute(
            `UPDATE bike_tour_itinerary
             SET tour_id = ?, day_number = ?, title = ?, description = ?, accommodation = ?, meals = ?, distance = ?, elevation = ?
             WHERE id = ?`,
            [tour_id, day_number, title, description, accommodation, meals, distance, elevation, id]
        );

        console.log("Update Itinerary Result:", result);
        return result;

    } catch (error) {
        console.log("Error Updating Itinerary:", error);
        throw error;
    }
};

// Delete Itinerary by ID
exports.deleteItineraryById = async (id) => {
    const [result] = await db.execute("DELETE FROM bike_tour_itinerary WHERE id = ?", [id]);
    return result;
};

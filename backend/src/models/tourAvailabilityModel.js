const db = require('../config/db');

exports.addTourAvailability = async (tour_id, available_date, available_slots, availability_status, end_date) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO bike_tour_availability (tour_id, available_date, available_slots, availability_status, end_date) VALUES (?, ?, ?, ?, ?)",
            [tour_id, available_date, available_slots, availability_status, end_date]
        );
        return result;
    } catch (error) {
        console.error("Error inserting tour availability:", error);
        throw error;
    }
};

exports.getAllTourAvailability = async () => {
    try {
        const [tourAvailability] = await db.query(
            'SELECT * FROM bike_tour_availability '
        );

        return tourAvailability;
    } catch (error) {
        console.log("Error retrieving bike tourAvailability:", error);
        throw error;
    }
};

// Get Itinerary by Tour ID
exports.getTourAvailabilityByTourId = async (tour_id) => {
    const [tourAvailability] = await db.query("SELECT * FROM bike_tour_availability WHERE tour_id = ? ORDER BY availability_status", [tour_id]);
    return tourAvailability;
};

exports.getTourAvailabilityById = async (id) => {
    const [availability] =await db.query("SELECT * FROM bike_tour_availability  WHERE id = ?",[id]);
    return availability
}

// Update itinerary by ID
exports.updateTourAvailabilityById = async (id, updateData) => {
    if (!id) {
        throw new Error("Tour Availability ID is undefined or null");
    }

    const {
        tour_id,
        available_date,
        available_slots, 
        availability_status,
        end_date
    } = updateData;

    try {
        const [result] = await db.execute(
            `UPDATE bike_tour_availability
             SET tour_id = ?, available_date = ?, available_slots = ?, availability_status = ?, end_date = ?
             WHERE id = ?`,
            [tour_id, available_date, available_slots, availability_status, end_date, id]
        );

        console.log("Update tour availability Result:", result);
        return result;

    } catch (error) {
        console.log("Error Updating tour availability:", error);
        throw error;
    }
};

// Delete Itinerary by ID
exports.deleteTourAvailabilityById = async (id) => {
    const [result] = await db.execute("DELETE FROM bike_tour_availability WHERE id = ?", [id]);
    return result;
};

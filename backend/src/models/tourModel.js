const db = require('../config/db');

// Create Bike Tour
exports.createBikeTour = async (
    price,
    duration,
    distance,
    difficulty,
    tour_code,
    next_departure,
    category,
    tourName,
    bike_hire_cost,
    description,
    tourImage,
) => {
    try {
        const [result] = await db.execute(
            `INSERT INTO bike_tours (
                price, duration, distance, difficulty, tour_code, next_departure,
                category, tourName, bike_hire_cost, description, tourImage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [price, duration, distance, difficulty, tour_code, next_departure, category, tourName, bike_hire_cost, description, tourImage]
        );

        console.log("Bike Tour Insert Result:", result);
        return result;
    } catch (error) {
        console.log("Error inserting bike tour:", error);
        throw error;
    }
};

// Find Bike Tour By ID
exports.findBikeTourById = async (tour_id) => {
   try {
     const [result] = await db.query("SELECT * FROM bike_tours WHERE tour_id = ?", [tour_id]);
     return result;
   } catch (error) {
    console.log('Error retreiving category by id', error)
     throw error; 
   }
};

// Update Bike Tour By ID
exports.updateBikeTourById = async (tourId, updateTour) => {
    if (!tourId) {
        throw new Error("Tour ID is undefined or null");
    }

    const {
        price,
        duration,
        distance,
        difficulty,
        tour_code,
        next_departure,
        category,
        tourName,
        bike_hire_cost,
        description,
        Image  // assuming 'Image' from req.file.cloudinaryUrl
    } = updateTour;

    const sanitizedTour = {
        price: price || null,
        duration: duration || null,
        distance: distance || null,
        difficulty: difficulty || null,
        tour_code: tour_code || null,
        next_departure: next_departure || null,
        category: category || null,
        tourName: tourName || null,
        bike_hire_cost: bike_hire_cost || null,
        description: description || null,
        tourImage: Image || null
    };

    try {
        const [result] = await db.execute(
            `UPDATE bike_tours SET
                price = ?, duration = ?, distance = ?, difficulty = ?, tour_code = ?,
                next_departure = ?, category = ?, tourName = ?, bike_hire_cost = ?,
                description = ?, tourImage = ?, updated_at = CURRENT_TIMESTAMP
             WHERE tour_id = ?`,
            [
                sanitizedTour.price,
                sanitizedTour.duration,
                sanitizedTour.distance,
                sanitizedTour.difficulty,
                sanitizedTour.tour_code,
                sanitizedTour.next_departure,
                sanitizedTour.category,
                sanitizedTour.tourName,
                sanitizedTour.bike_hire_cost,
                sanitizedTour.description,
                sanitizedTour.tourImage,
                tourId
            ]
        );

        console.log("Bike Tour Update Result:", result);
        return result;
    } catch (error) {
        console.log("Error updating bike tour:", error);
        throw error;
    }
};


// Delete Bike Tour By ID
exports.deleteBikeTourById = async (tourId) => {
    if (!tourId) {
        console.log("Tour ID is undefined or null");
        throw new Error("Invalid Tour ID");
    }

    try {
        const [result] = await db.execute(
            "DELETE FROM bike_tours WHERE tour_id = ?",
            [tourId]
        );

        console.log("Bike Tour Delete Result:", result);
        return result;
    } catch (error) {
        console.log("Error deleting bike tour:", error);
        throw error;
    }
};

// Get All Bike Tours (with optional limit and offset)
exports.getAllBikeTours = async () => {
    try {
        const [tours] = await db.query(
            'SELECT * FROM bike_tours'
        );

        return tours;
    } catch (error) {
        console.log("Error retrieving bike tours:", error);
        throw error;
    }
};

// Count Total Bike Tours
exports.countAllBikeTours = async () => {
    try {
        const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM bike_tours");
        return total;
    } catch (error) {
        console.log("Error counting bike tours:", error);
        throw error;
    }
};

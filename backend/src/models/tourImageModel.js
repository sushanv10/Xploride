const db = require('../config/db');

// Upload Image
exports.addTourImage = async (tour_id, image_url) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO bike_tour_images (tour_id, image_url) VALUES (?, ?)",
            [tour_id, image_url]
        );
        return result;
    } catch (error) {
        console.error("Error inserting tour image:", error);
        throw error;
    }
};

// Get All Images By Tour ID
exports.getImagesByTourId = async (tour_id) => {
    const [images] = await db.query("SELECT * FROM bike_tour_images WHERE tour_id = ?", [tour_id]);
    return images;
};

// Delete Image by ID
exports.deleteImageById = async (id) => {
    const [result] = await db.execute("DELETE FROM bike_tour_images WHERE id = ?", [id]);
    return result;
};

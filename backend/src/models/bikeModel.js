const db = require('../config/db');

// Create a new bike
exports.createBike = async (bikeName, brand, model, category, price, availability, description, bikeImage, weight, wheel, size) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO bikes (bikeName, brand, model, category, price, availability, description, bikeImage, weight, wheel, size) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
            [bikeName, brand, model, category, price, availability, description, bikeImage, weight, wheel, size]
        );
        console.log("Insert Result:", result);
        return result;
    } catch (error) {
        console.log("Error inserting bike:", error);
        throw error;   
    }
};

// Find bike by ID
exports.findBikeById = async (bikeId) => {
    try {
        const [bike] = await db.query("SELECT * FROM bikes WHERE bikeId = ?", [bikeId]);
        return bike[0];
    } catch (error) {
        console.log("Error finding bike by ID:", error);
        throw error;
    }
};

// Update bike by ID
exports.updateBikeById = async (bikeId, updateBike) => {
    if (bikeId === undefined || bikeId === null) {
        throw new Error("Product Id is undefined or null");
    }

    const {
    bikeName,
    brand,
    model,
    category,
    price,
    availability,
    description,
    bikeImage,
    weight,
    wheel,
    size
    } = updateBike;

    try {
        const [result] = await db.execute(
            "UPDATE bikes SET bikeName = ?, brand = ?, model = ?, category = ?, price = ?,  availability = ?, description = ?, bikeImage = ?, weight = ?, wheel = ? , size= ?, updated_at = CURRENT_TIMESTAMP WHERE bikeId = ?",
            [bikeName, brand, model, category, price, availability, description, bikeImage, , weight, wheel, size, bikeId]
        );

        console.log("Update Result:", result);
        return result;
        
    } catch (error) {
        console.log("Error Updating Product:", error);
        throw error;
    }
};

// Delete bike by ID
exports.deleteBikeById = async (bikeId) => {
    try {
        const [result] = await db.execute("DELETE FROM bikes WHERE bikeId = ?", [bikeId]);
        return result;
    } catch (error) {
        console.log("Error deleting bike:", error);
        throw error;
    }
};

// Get all bikes
exports.getAllBikes = async () => {
    try {
        const [bikes] = await db.query("SELECT * FROM bikes");
        return bikes;
    } catch (error) {
        console.log("Error retrieving bikes:", error);
        throw error;
    }
};

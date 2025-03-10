const db = require('../config/db'); // ✅ Import correctly


exports.createUser = async (userName, email, password, address, contact, role) => {
    try {
        console.log("Registering user:", userName, email); 

        const [result] = await db.execute(
            "INSERT INTO users (userName, email, password, address, contact, role) VALUES(?,?,?,?,?,?)",
            [userName, email, password, address, contact, role || "user"]
        );

        console.log("Insert Result:", result); 
        return result;
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
};

exports.findUserByEmail = async (email) => {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return users.length > 0 ? users[0] : null;
};

exports.findUserById = async (userId) => {
    if (userId === undefined || userId === null) {  // ✅ Fix: Allow userId = 0
        throw new Error("User ID is undefined or null");
    }

    console.log("Finding user with ID:", userId); // Debugging

    const [users] = await db.execute("SELECT * FROM users WHERE userId = ?", [userId]);

    return users.length > 0 ? users[0] : null;
};

const User = require("../models/authModel");

function authorizeRole(role) {
    return async (req, res, next) => {
        try {
            // Ensure req.user exists
            if (!req.user || req.user.userId === undefined) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            // Find the user by userId
            const user = await User.findUserById(req.user.userId);
            console.log("User found in DB:", user);

            if (!user) {
                return res.status(404).json({ message: "User does not exist" });
            }

            if (user.role !== role) {
                return res.status(403).json({
                    success: false,
                    message: "Unauthorized access"
                });
            }
            next(); 
        } catch (error) {
            console.error("Authorization error:", error);
            res.status(500).json({ msg: "Internal server error" });
        }
    };
}

module.exports = authorizeRole;

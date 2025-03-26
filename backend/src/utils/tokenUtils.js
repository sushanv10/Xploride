const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.generateTokens = (user) => {
    try {
        const accessToken = jwt.sign(
            { 
                userId: user.userId,
                role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        const refreshToken = jwt.sign(
            { userId: user.userId, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Token generation failed");
    }
};

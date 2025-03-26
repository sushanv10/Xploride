const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/authModel");
const { generateTokens } = require("../utils/tokenUtils");

/**
 * Register User
 */
exports.registerUser = async (req, res) => {
    try {
        const { userName, email, password, confirmPassword, address, contact, role } = req.body;

        if (!userName || !email || !password || !address || !contact) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm password do not match" });
        }

        // Check if the email already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Register user
        const result = await createUser(userName, email, hashedPassword, address, contact, role);

        console.log("User Created:", result);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

/**
 * Login User
 */

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        const { password: _, ...userWithoutPassword } = user;

        const { accessToken, refreshToken } = generateTokens(user);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "User login successful",
            data: userWithoutPassword, 
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.logoutUser = (_, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })
        res.status(200).json({message: "User logged out successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server error"});
    }
}
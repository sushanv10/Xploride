const User = require('../models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const createUser = async (req, res) => {
    const { userName, email, password, confirmPassword, phone, address, role } = req.body;
    
    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = await User.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            role
        });

       
        const token = jwt.sign({ userId: newUser.userId, email: newUser.email }, process.env.JWT_SECRET, 
            { expiresIn: '1h' });

        // Send the response
        res.status(201).json({ msg: "User created successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the response
        res.status(200).json({ msg: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { createUser, loginUser };

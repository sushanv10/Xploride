const express = require('express');
const { createUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', createUser);

// Login user
router.post('/login', loginUser);

module.exports = router;

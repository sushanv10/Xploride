const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');

const router = express.Router();

// Register a new user
router.post('/register',registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.post('/logout',logoutUser);

// protected routes for user
router.get('/auth-user', authMiddleware, authorizeRole('user'), (_, res) => {
     res.status(200).send({ok:true});
}) 

// protected routes for admin
router.get('/auth-admin', authMiddleware, authorizeRole('admin'), (_ , res) => {
    res.status(200).send({ok:true});
} )

module.exports = router;

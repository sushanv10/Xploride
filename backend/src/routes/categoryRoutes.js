const express = require('express');
const {addCategory, getAllCategory, getCategoryById, updateCategoryById, deleteCategoryById} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const router = express.Router();

// Route for adding category
router.post('/add', authMiddleware, authorizeRole('admin'), addCategory);

module.exports = router;
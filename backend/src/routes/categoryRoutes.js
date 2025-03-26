const express = require('express');
const {addCategory, getAllCategory, getCategoryById, updateCategoryById, deleteCategoryById} = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const router = express.Router();

// Route for adding category
router.post('/add', authMiddleware, authorizeRole('admin'), addCategory);

// Route to get category by id
router.get('/:id', authMiddleware, getCategoryById);

// Route to get all category
router.get('/',getAllCategory);

// Route to update category by id
router.put('/update/:id', authMiddleware, authorizeRole('admin'), updateCategoryById);

// Route to delete category by id
router.delete('/:id', authMiddleware, authorizeRole('admin'), deleteCategoryById);


module.exports = router;
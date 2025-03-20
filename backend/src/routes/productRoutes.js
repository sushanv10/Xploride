const express = require('express');
const { createProduct, updateProduct, getProductById, deleteProduct, getAllProducts } = require('../controllers/productController');
const { cloudinaryUpload, uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/authorizationMiddleware');
const router = express.Router();

// Route to create a product
router.post('/create', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, createProduct);

// Route to update a product by ID
router.put('/update/:id', authMiddleware, authorizeRole('admin'), cloudinaryUpload, uploadToCloudinary, updateProduct);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to delete a product by ID
router.delete('/delete/:id', authMiddleware, authorizeRole('admin'), deleteProduct);

// Route to get all products
router.get('/', getAllProducts);

module.exports = router;

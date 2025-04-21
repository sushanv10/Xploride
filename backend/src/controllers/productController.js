const { createProduct, updateProductById, findProductById, deleteProductById, getAllProducts, countAllProducts } = require('../models/productModel');
const { uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');

// Create a new product
exports.createProduct = async (req, res) => {

    try {
        // upload image in cloudinary
        uploadToCloudinary (req, res, async (err) => {
            if(err){
                return res.status(400).json({message: err.message});
            }
    
            const { productName, productPrice, productDescription, productType, countInStock, categoryId}= req.body
    
            // Validate Fields
            if(!productName || !productPrice || !productDescription || !productType || !countInStock || !categoryId){
                return res.status(400).json({message: "All fields are required"});
            }
    
            // Get Image URL from Cloudinary
            const cloudinaryUrl = req.file.cloudinaryUrl;
    
            // Create a product
            const result = await createProduct(
                productName,
                productPrice,
                productDescription,
                cloudinaryUrl,
                productType,
                countInStock,
                categoryId
            );
    
            // Response success message
            return res.status(201).json({
                message: "Product created successfully",
                product: {
                    productId: result.insertId,
                    productName,
                    productPrice,
                    productDescription,
                    productImage: cloudinaryUrl,
                    productType,
                    countInStock,
                    categoryId,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            })
        });
        
    } catch (error) {
        console.log("Error creating product:", error)
        res.status(500).json({message: "Server Error"});
    }
};


// Update a product
exports.updateProduct = async (req, res ) => {
    try {
        const productId = req.params.id ;
        const {productName, productPrice, productDescription, productType,  countInStock, categoryId} = req.body ;

        // Validate input fields
        if (!productName || !productPrice || !productDescription || !productType || !countInStock || !categoryId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedProduct = {
            productName,
            productPrice,
            productDescription,
            productType,
            countInStock,
            categoryId
        }

        // Check if an image was uploaded
        if(req.file){
            updatedProduct.Image = req.file.cloudinaryUrl;
        }

        // Update product in databse
        const result = await updateProductById(productId, updatedProduct);

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Product not found"});
        }

        // Success Responce
        return res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });
    } catch (error) {
        console.log("Error updating product:",error);
        return res.status(500).json({message: "Server Error"});
    }
}

// Get product
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;

        const result = await findProductById(productId);

        if (result.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = result[0]; // Now safely get the product

        return res.status(200).json({ product });
    } catch (error) {
        console.log("Error retrieving product:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id ;

        const result = await deleteProductById(productId);
        
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Product not found"});
        }

        return res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.log("Error deleting product:", error);
        return res.status(500).json({message: "Server Error"});
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const offset = (page - 1) * limit;

        const products = await getAllProducts(limit, offset);
        const totalProducts = await countAllProducts();

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        const totalPages = Math.ceil(totalProducts / limit);

        return res.status(200).json({
            products,
            currentPage: page,
            totalPages,
            totalProducts,
        });
    } catch (error) {
        console.error("Error retrieving products:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


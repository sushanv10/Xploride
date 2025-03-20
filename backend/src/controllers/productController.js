const { createProduct, updateProductById, findProductById, deleteProductById, getAllProducts } = require('../models/productModel');
const { uploadToCloudinary } = require('../middleware/cloudinaryImageUpload');

// Create a new product
exports.createProduct = async (req, res) => {

    try {
        // upload image in cloudinary
        uploadToCloudinary (req, res, async (err) => {
            if(err){
                return res.status(400).json({message: err.message});
            }
    
            const { productName, productPrice, productDescription, productType, category, countInStock}= req.body
    
            // Validate Fields
            if(!productName || !productPrice || !productDescription || !productType || !category || !countInStock){
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
                category,
                countInStock
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
                    category,
                    countInStock,
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
        const {productName, productPrice, productDescription, productType, category, countInStock} = req.body ;

        // Validate input fields
        if (!productName || !productPrice || !productDescription || !productType || !category || !countInStock) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedProduct = {
            productName,
            productPrice,
            productDescription,
            productType,
            category,
            countInStock
        }

        // Check if an image was uploaded
        if(req.file){
            updatedProduct.productImage = req.file.cloudinaryUrl;
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
        const productId = req.params.id ;

        // Fetch product from the database
        const product = await findProductById(productId);

        if(product.length === 0){
            return res.status(404).json({message: "Product not found"});
        }

        return res.status(200).json({product});
    } catch (error) {
        console.log("Error retrieving product:", error);
        return res.status(500).json({message: "Server Error"});
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


// Get all products
exports.getAllProducts = async (_, res) => {
    try {
        const products = await getAllProducts();

        // Check if products array is empty
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error("Error retrieving products:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


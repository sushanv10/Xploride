const db = require('../config/db');

// Create product
exports.createProduct = async (productName, productPrice, productDescription, productImage, productType, category, countInStock) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO products (productName, productPrice, productDescription, productImage, productType, category,countInStock) VALUES(?,?,?,?,?,?,?)",
            [productName, productPrice, productDescription, productImage, productType, category, countInStock]
        );

        console.log("Insert Result:", result);
        return result;
    } catch (error) {
        console.log("Error inserting products:", error);
        throw error;   
    }
};

// Find Product By Id
exports.findProductById = async (productId) => {
    // Fetch product by ID from the database
    const product = await db.query("SELECT * FROM products WHERE productId = ?", [productId]);
    return product[0];  
};

// Update Product by Id
exports.updateProductById = async (productId, updateProduct) => {
    if(productId === undefined || productId === null){
        throw new error("Product Id is undefined or null");
    }
    const {
        productName,
        productPrice,
        productDescription,
        productImage,
        productType,
        category,
        countInStock
    } = updateProduct

    try {
        const [result] = await db.execute(
            "UPDATE products SET productName = ?, productPrice = ?, productDescription = ?, productImage = ?, productType = ?, category = ?, countInStock = ? , updated_at = CURRENT_TIMESTAMP WHERE productId = ?",
            [productName, productPrice, productDescription, productImage, productType, category, countInStock, productId]
        );

        console.log("Update Result:", result);
        return result;
        
    } catch (error) {
        console.log("Error Updating Product:", error);
        throw error;
    }
};

// Delete Product By Id
exports.deleteProductById = async (productId) => {
    if(productId === undefined || productId === null){
        console.log("Product Id is undefined or null");
    }

    try {
        const [result] = await db.execute(
            "DELETE FROM products WHERE productId = ? ", [productId]
        );
        console.log("Delete Result:", result);
        return result;
    } catch (error) {
        console.log("Error Deleting Product:", error);
        throw error;   
    }
};

// Get all products
exports.getAllProducts = async () => {
    try {
        const [products] = await db.query(
            "SELECT * FROM products"
        );
            return products;
    } catch (error) {
        console.log("Error retrieving products:", error);
        throw error; 
    }
};
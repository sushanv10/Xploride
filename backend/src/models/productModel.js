const db = require('../config/db');

// Create product
exports.createProduct = async (productName, productPrice, productDescription, productImage, productType, countInStock, categoryId) => {
    try {
        const [result] = await db.execute(
            "INSERT INTO products (productName, productPrice, productDescription, productImage, productType, countInStock, categoryId) VALUES(?,?,?,?,?,?,?)",
            [productName, productPrice, productDescription, productImage, productType, countInStock, categoryId]
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
    const result = await db.query("SELECT * FROM products WHERE productId = ? limit 10", [productId]);
    return result;  
};

// Update Product by Id
// Update Product by Id
exports.updateProductById = async (productId, updateProduct) => {
    if (productId === undefined || productId === null) {
        throw new Error("Product Id is undefined or null");
    }

    // Destructure product fields from the updateProduct object
    const {
        productName,
        productPrice,
        productDescription,
        Image,
        productType,
        countInStock,
        categoryId
    } = updateProduct;

    // Sanitize undefined values by replacing them with null
    const sanitizedProduct = {
        productName: productName || null,
        productPrice: productPrice || null,
        productDescription: productDescription || null,
        productImage: Image || null,  
        productType: productType || null,
        countInStock: countInStock || null,
        categoryId: categoryId || null
    };

    try {
        // SQL query to update the product
        const [result] = await db.execute(
            "UPDATE products SET productName = ?, productPrice = ?, productDescription = ?, productImage = ?, productType = ?, countInStock = ?, categoryId = ?, updated_at = CURRENT_TIMESTAMP WHERE productId = ?",
            [
                sanitizedProduct.productName,
                sanitizedProduct.productPrice,
                sanitizedProduct.productDescription,
                sanitizedProduct.productImage,
                sanitizedProduct.productType,
                sanitizedProduct.countInStock,
                sanitizedProduct.categoryId,
                productId
            ]
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



exports.getAllProducts = async (limit, offset) => {
    try {
        const [products] = await db.query(
            `SELECT *, categoryName FROM products 
             LEFT JOIN category ON products.categoryId = category.categoryId 
             ORDER BY products.created_at DESC 
             LIMIT ? OFFSET ?`,
            [limit, offset]
        );

        return products;
    } catch (error) {
        console.log("Error retrieving products:", error);
        throw error;
    }
};

// Count total products
exports.countAllProducts = async () => {
    try {
        const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM products`);
        return total;
    } catch (error) {
        console.log("Error counting products:", error);
        throw error;
    }
};

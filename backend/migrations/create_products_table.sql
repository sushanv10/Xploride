CREATE TABLE IF NOT EXISTS products (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    productPrice DECIMAL(10,2) NOT NULL,
    productDescription TEXT NOT NULL,
    productImage VARCHAR(500) NOT NULL,  
    productType VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE products
-- ADD COLUMN category VARCHAR(255) NOT NULL,
-- ADD COLUMN countInStock INT NOT NULL;

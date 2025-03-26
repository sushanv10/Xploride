
CREATE TABLE products (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    productPrice DECIMAL(10,2) NOT NULL,
    productDescription TEXT NOT NULL,
    productImage VARCHAR(500) NOT NULL,  
    productType VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,  -- Foreign key reference to category table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES category(categoryId) ON DELETE CASCADE
);
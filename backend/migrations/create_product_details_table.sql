CREATE TABLE IF NOT EXISTS product_details (
    detailId INT AUTO_INCREMENT PRIMARY KEY,
    productId INT NOT NULL,
    detail TEXT NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE
);

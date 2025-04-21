CREATE TABLE IF NOT EXISTS bikes (
    bikeId INT AUTO_INCREMENT PRIMARY KEY,
    bikeName VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    category ENUM('road', 'mountain', 'hybrid', 'electric') NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    availability BOOLEAN DEFAULT TRUE,
    description TEXT,
    bikeImage VARCHAR(500) NOT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_brand (brand),
    INDEX idx_category (category),
    INDEX idx_price (price)

    
);

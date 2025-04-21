CREATE TABLE IF NOT EXISTS bike_rentals (
    rentalId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    bikeId INT NOT NULL,
    identificationImage VARCHAR(500) NOT NULL, 
    rentStartDate DATE NOT NULL,
    rentEndDate DATE NOT NULL,
    status ENUM('pending', 'approved', 'rejected', 'ongoing', 'completed', 'cancelled') DEFAULT 'pending',
    totalAmount DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (bikeId) REFERENCES bikes(bikeId) ON DELETE CASCADE,

    INDEX idx_user (userId),
    INDEX idx_bike (bikeId),
    INDEX idx_status (status)
);

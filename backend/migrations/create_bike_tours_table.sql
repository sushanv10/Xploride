CREATE TABLE IF NOT EXISTS bike_tours (
    tour_id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2),
    duration VARCHAR(100),
    distance VARCHAR(50),
    difficulty VARCHAR(50),
    tour_code VARCHAR(100) UNIQUE,
    next_departure DATE,
    category VARCHAR(100),
    bike_hire BOOLEAN DEFAULT FALSE,
    bike_hire_cost DECIMAL(10, 2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

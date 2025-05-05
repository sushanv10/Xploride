CREATE TABLE IF NOT EXISTS bike_tour_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT,
    available_date DATE NOT NULL,
    available_slots INT NOT NULL DEFAULT 0,
    availability_status ENUM('available', 'unavailable') NOT NULL DEFAULT 'available',
    FOREIGN KEY (tour_id) REFERENCES bike_tours(tour_id) ON DELETE CASCADE
);
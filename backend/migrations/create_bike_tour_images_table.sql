CREATE TABLE IF NOT EXISTS bike_tour_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (tour_id) REFERENCES bike_tours(tour_id) ON DELETE CASCADE
);


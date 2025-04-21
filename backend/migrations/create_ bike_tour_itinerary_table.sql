CREATE TABLE IF NOT EXISTS bike_tour_itinerary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT,
    day_number INT,
    title VARCHAR(255),                  -- e.g., "Day 1 Arrive in Kathmandu"
    description TEXT,                    -- Full text describing the day
    accommodation VARCHAR(255),          -- e.g., "International Guest House"
    meals VARCHAR(100),                  -- e.g., "Breakfast, Lunch, Dinner"
    distance VARCHAR(50),                -- e.g., "Ride 23km"
    elevation VARCHAR(50),               -- e.g., "↑1021m" or "Gain: 1000m"
    FOREIGN KEY (tour_id) REFERENCES bike_tours(tour_id) ON DELETE CASCADE
);
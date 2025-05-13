CREATE TABLE tour_bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  bikeId INT NOT NULL,
  availability_id INT NOT NULL,
  number_of_people INT NOT NULL,
  totalAmount DECIMAL(10,2) DEFAULT 0.00,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('booked', 'cancelled', 'completed') NOT NULL DEFAULT 'booked',
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
  FOREIGN KEY (bikeId) REFERENCES bikes(bikeId) ON DELETE CASCADE,
  FOREIGN KEY (availability_id) REFERENCES bike_tour_availability(id) ON DELETE CASCADE
);

DELIMITER $$

-- Prevent overbooking only for 'booked' status
CREATE TRIGGER prevent_overbooking
BEFORE INSERT ON tour_bookings
FOR EACH ROW
BEGIN
  DECLARE slots_left INT;

  IF NEW.status = 'booked' THEN
    SELECT available_slots INTO slots_left
    FROM bike_tour_availability
    WHERE id = NEW.availability_id;

    IF slots_left < NEW.number_of_people THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Not enough slots available for this tour date.';
    END IF;
  END IF;
END$$

-- Reduce slots only if booking is 'booked'
CREATE TRIGGER reduce_slots_after_booking
AFTER INSERT ON tour_bookings
FOR EACH ROW
BEGIN
  IF NEW.status = 'booked' THEN
    UPDATE bike_tour_availability
    SET available_slots = available_slots - NEW.number_of_people
    WHERE id = NEW.availability_id;
  END IF;
END$$

-- Restore slots if booking was 'booked' and now deleted (or canceled record)
CREATE TRIGGER restore_slots_after_cancel
AFTER DELETE ON tour_bookings
FOR EACH ROW
BEGIN
  IF OLD.status = 'booked' THEN
    UPDATE bike_tour_availability
    SET available_slots = available_slots + OLD.number_of_people
    WHERE id = OLD.availability_id;
  END IF;
END$$

DELIMITER ;

const db = require('./database')

const seedSQL = `
INSERT OR IGNORE INTO riders
(rider_id, rider_name, student_id, email, phone)
VALUES
(1, 'Arun Kumar', 'STU001', 'arun@example.com', '9876543210'),
(2, 'Priya Sharma', 'STU002', 'priya@example.com', '9876543211'),
(3, 'Rahul Kumar', 'STU003', 'rahul@example.com', '9876543212');

INSERT OR IGNORE INTO bikes
(bike_id, bike_name, bike_type, availability)
VALUES
(1, 'City Rider', 'Road', 'Available'),
(2, 'Mountain Explorer', 'Mountain', 'Available'),
(3, 'Electric Cruiser', 'Electric', 'Available');

INSERT OR IGNORE INTO rentals
(rental_id, rider_id, bike_id, rental_date, return_date)
VALUES
(1, 1, 1, '2026-11-12', NULL),
(2, 2, 2, '2026-11-12', NULL),
(3, 3, 3, '2026-11-12', NULL);
`

db.exec(seedSQL, (error) => {
    if (error) {
        console.log('Sample data insertion failed:', error.message)
    } else {
        console.log('Sample data inserted successfully!')
    }

    db.close()
})

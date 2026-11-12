
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS riders (
    rider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    rider_name TEXT NOT NULL,
    student_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    phone TEXT
);

CREATE TABLE IF NOT EXISTS bikes (
    bike_id INTEGER PRIMARY KEY AUTOINCREMENT,
    bike_name TEXT NOT NULL,
    bike_type TEXT NOT NULL
        CHECK (bike_type IN ('Road', 'Mountain', 'Electric')),
    availability TEXT DEFAULT 'Available'
);

CREATE TABLE IF NOT EXISTS rentals (
    rental_id INTEGER PRIMARY KEY AUTOINCREMENT,
    rider_id INTEGER NOT NULL,
    bike_id INTEGER NOT NULL,
    rental_date TEXT NOT NULL,
    return_date TEXT,
    FOREIGN KEY (rider_id) REFERENCES riders(rider_id),
    FOREIGN KEY (bike_id) REFERENCES bikes(bike_id)
);

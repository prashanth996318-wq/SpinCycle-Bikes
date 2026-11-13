
const express = require('express')
const router = express.Router()
const db = require('../database')

// Get all rentals with rider and bike details
router.get('/', (req, res) => {
  const sql = `
    SELECT
      rentals.rental_id,
      riders.rider_name,
      riders.student_id,
      bikes.bike_name,
      bikes.bike_type,
      rentals.rental_date,
      rentals.return_date
    FROM rentals
    JOIN riders ON rentals.rider_id = riders.rider_id
    JOIN bikes ON rentals.bike_id = bikes.bike_id
  `

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.status(200).json(rows)
  })
})

// Get rental by ID
router.get('/:id', (req, res) => {
  const sql = `
    SELECT
      rentals.rental_id,
      riders.rider_name,
      bikes.bike_name,
      rentals.rental_date,
      rentals.return_date
    FROM rentals
    JOIN riders ON rentals.rider_id = riders.rider_id
    JOIN bikes ON rentals.bike_id = bikes.bike_id
    WHERE rentals.rental_id = ?
  `

  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (!row) {
      return res.status(404).json({ message: 'Rental not found' })
    }

    res.status(200).json(row)
  })
})

module.exports = router

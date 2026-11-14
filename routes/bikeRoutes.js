
const express = require('express')
const router = express.Router()
const db = require('../database')
// Allowed bike types
const allowedBikeTypes = ['Road', 'Mountain', 'Electric']

// 1. Get all bikes
router.get('/', (req, res) => {
  db.all('SELECT * FROM bikes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.status(200).json(rows)
  })
})

// 2. Search bikes by name or type
router.get('/search', (req, res) => {
  const { name, type } = req.query

  if (!name && !type) {
    return res.status(400).json({
      message: 'Please provide a bike name or bike type to search'
    })
  }

  let sql = 'SELECT * FROM bikes WHERE 1=1'
  const params = []

  if (name) {
    sql += ' AND bike_name LIKE ?'
    params.push(`%${name}%`)
  }

  if (type) {
    sql += ' AND bike_type LIKE ?'
    params.push(`%${type}%`)
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }

    res.status(200).json({
      message: rows.length ? 'Bikes found successfully' : 'No bikes found',
      results: rows
    })
  })
})

// 3. Get a bike by ID
router.get('/:id', (req, res) => {
  const id = req.params.id

  db.get('SELECT * FROM bikes WHERE bike_id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    if (!row) {
      return res.status(404).json({ message: 'Bike not found' })
    }

    res.status(200).json(row)
  })
})

// 4. Add a new bike
router.post('/', (req, res) => {
  const { bike_name, bike_type, availability } = req.body

  if (!bike_name || !bike_type) {
    return res.status(400).json({
      message: 'Bike name and bike type are required'
    })
  }
    if (!allowedBikeTypes.includes(bike_type)) {
    return res.status(400).json({
      message: 'Invalid bike type. Allowed types are: Road, Mountain, Electric'
    })
  }

  const status = availability || 'Available'

  db.run(
    'INSERT INTO bikes (bike_name, bike_type, availability) VALUES (?, ?, ?)',
    [bike_name, bike_type, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      res.status(201).json({
        message: 'Bike added successfully',
        bike_id: this.lastID
      })
    }
  )
})

// 5. Update a bike
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { bike_name, bike_type, availability } = req.body

  if (!bike_name || !bike_type || !availability) {
    return res.status(400).json({
      message: 'Bike name, bike type and availability are required'
    })
  }
    if (!allowedBikeTypes.includes(bike_type)) {
    return res.status(400).json({
      message: 'Invalid bike type. Allowed types are: Road, Mountain, Electric'
    })
  }

  db.run(
    'UPDATE bikes SET bike_name = ?, bike_type = ?, availability = ? WHERE bike_id = ?',
    [bike_name, bike_type, availability, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Bike not found' })
      }

      res.status(200).json({ message: 'Bike updated successfully' })
    }
  )
})

// 6. Delete a bike
router.delete('/:id', (req, res) => {
  const id = req.params.id

  db.run(
    'DELETE FROM bikes WHERE bike_id = ?',
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message })
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Bike not found' })
      }

      res.status(200).json({ message: 'Bike deleted successfully' })
    }
  )
})

module.exports = router

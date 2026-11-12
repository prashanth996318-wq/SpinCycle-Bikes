
const express = require('express')
const router = express.Router()

// Get all rentals with rider and bike details
router.get('/', (req, res) => {
  res.send('Get all rentals with rider and bike details')
})

// Get rental by ID
router.get('/:id', (req, res) => {
  res.send(`Get rental with ID: ${req.params.id}`)
})

// Create a new rental
router.post('/', (req, res) => {
  res.send('Create a new rental')
})

module.exports = router


const express = require('express')
const router = express.Router()

// Get all bikes
router.get('/', (req, res) => {
  res.send('Get all bikes')
})

// Get a bike by ID
router.get('/:id', (req, res) => {
  res.send(`Get bike with ID: ${req.params.id}`)
})

// Add a new bike
router.post('/', (req, res) => {
  res.send('Add a new bike')
})

// Update a bike
router.put('/:id', (req, res) => {
  res.send(`Update bike with ID: ${req.params.id}`)
})

// Delete a bike
router.delete('/:id', (req, res) => {
  res.send(`Delete bike with ID: ${req.params.id}`)
})

module.exports = router

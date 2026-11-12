
const express = require('express')
const router = express.Router()

// Get all riders
router.get('/', (req, res) => {
  res.send('Get all riders')
})

// Get a rider by ID
router.get('/:id', (req, res) => {
  res.send(`Get rider with ID: ${req.params.id}`)
})

// Add a new rider
router.post('/', (req, res) => {
  res.send('Add a new rider')
})

module.exports = router

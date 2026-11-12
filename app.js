
const express = require('express')

const app = express()

// Middleware to read JSON data
app.use(express.json())

// Import route files
const bikeRoutes = require('./routes/bikeRoutes')
const riderRoutes = require('./routes/riderRoutes')
const rentalRoutes = require('./routes/rentalRoutes')

// Connect API routes
app.use('/bikes', bikeRoutes)
app.use('/riders', riderRoutes)
app.use('/rentals', rentalRoutes)

// Home route to check whether the server is running
app.get('/', (req, res) => {
  res.send('SpinCycle Bikes API is running successfully!')
})

// Start the server
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

module.exports = app

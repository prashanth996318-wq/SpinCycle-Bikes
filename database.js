
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join(__dirname, 'spincycle.db')

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.log('Database connection failed:', error.message)
  } else {
    console.log('Connected to SpinCycle Bikes database')

    db.run('PRAGMA foreign_keys = ON')
  }
})

module.exports = db

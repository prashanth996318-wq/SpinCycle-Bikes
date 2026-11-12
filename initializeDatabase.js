const fs = require('fs')
const path = require('path')
const db = require('./database')

// Read the SQL schema file
const schema = fs.readFileSync(
    path.join(__dirname, 'schema.sql'),
    'utf8'
)

// Create the database tables
db.exec(schema, (error) => {
    if (error) {
        console.log('Database setup failed:', error.message)
    } else {
        console.log('Database tables created successfully!')
    }

    db.close()
})
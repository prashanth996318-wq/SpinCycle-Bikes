
const db = require('./database')

db.serialize(() => {
    db.all('SELECT * FROM riders', (err, rows) => {
        console.log('\n--- RIDERS ---')
        if (err) console.log(err.message)
        else console.table(rows)
    })

    db.all('SELECT * FROM bikes', (err, rows) => {
        console.log('\n--- BIKES ---')
        if (err) console.log(err.message)
        else console.table(rows)
    })

    db.all(`
        SELECT rentals.rental_id,
               riders.rider_name,
               bikes.bike_name,
               rentals.rental_date
        FROM rentals
        JOIN riders ON rentals.rider_id = riders.rider_id
        JOIN bikes ON rentals.bike_id = bikes.bike_id
    `, (err, rows) => {
        console.log('\n--- RENTALS WITH RIDER AND BIKE ---')
        if (err) console.log(err.message)
        else console.table(rows)
    })
})

db.close()


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

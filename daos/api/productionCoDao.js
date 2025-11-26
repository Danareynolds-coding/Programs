
const connect = require('../../config/dbconfig')


const productionCoDao = {
  table: 'productionCo',
  findProgramsByProductionCo: (res, table, id) => {
    let sql = `SELECT
        pc.productionCo_id,
        pc.productionCo,
        p.programs_id,
        p.title AS programs_title 
    FROM productionCo AS pc
    JOIN programs AS p ON pc.productionCo_id = pc.productionCo_id
    WHERE pc.productionCo_id = ?`

    connect.query(sql, [id], (error, rows) => {
      if (!error) {
        if (rows.length === 1) {
          res.json(rows[0])
        } else {
          res.json(rows)
        }
      } else {
        console.log('Dao error', error)
        res.json({
          "message": 'error',
          'table': table,
          'error': error
        })
      }
    })
  }
}

module.exports = productionCoDao
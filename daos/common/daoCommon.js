// dao  data access object
// daoCommon holds methods that all other tables can use//
const connect = require('../../config/dbconfig')
//querry database methods 2args 1.sqlquery 2.callback function 
const daoCommon = {
  findAll: (res, table) => {
    connect.query(
      `SELECT * FROM ${table};`,
      (error, rows) => {
        if (!error) {
          if (rows.length === 1) {
            res.json(rows[0]);
          } else {
            res.json(rows);
          }
        } else {
          console.log(`Dao Error:${error}`);
          res.json({
            message: 'error',
            table: `${table}`,
            error: error
          })
        }
      }
    )
  },
  findById: (res, table, id) => {
    connect.query(
      `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
      (error, rows) => {
        if (!error) {
          if (rows.length === 1) {
            res.json(rows[0])
          } else {
            res.json(rows)
          }
        } else {
          console.log(`Dao Error: ${error}`)
          res.json({
            "message": 'error',
            'table': `${table}`,
            'error': error
          })
        }
      }
    )
  },                                                      

  sort: (res, table, sorter) => {
    connect.query(
      `SELECT * FROM ${table} ORDER BY ${sorter};`,
      (error, rows) => {
        if (!error) {
          if (rows.length === 1) {
            res.json(rows[0])
          } else {
            res.json(rows)
          }
        } else {
          console.log(`Dao Error: ${error}`)
          res.json({
            "message": 'error',
            'table': `${table}`,
            'error': error
          })
        }
      }
    )
  },
  create: (req, res, table) => {
    //Object.key returns array of keys
    if (Object.keys(req.body).length === 0) {
      res.json({
        "error": true,
        "message": "no fields to create"
      })
    } else {
      const fields = Object.keys(req.body)
      const values = Object.values(req.body)
      connect.execute(
        `INSERT INTO ${table} SET ${fields.join(' = ?,')} = ?`,
        values, 
        (error, dbres) => {
          if (!error) {
            res.json({
              last_id: dbres.insertId
            })
          } else {
            console.log(`${table}Dao error: `, error)
          }
        }
      )
    }
  },
  
  update: (req, res, table) => {
    if (isNaN(req.params.id)) {
      res.json({
        "error": true,
        "message": "id must be a number"
      })
    } else if (Object.keys(req.body).length == 0) {
      res.json({
        "error": true,
        "message": "No fields to update"
      })
    } else {
      const fields = Object.keys(req.body) //array of keys
      const values = Object.values(req.body) //array of values

        connect.execute(
          `UPDATE ${table}
          SET ${fields.join(' = ?,')} = ? 
          WHERE ${table}_id = ?;`,
          [...values, req.params.id],
          (error, dbres)=> {
            if(!error){
             res.json({
              "status":"updated",
              "changedRows":dbres.changedRows
             }) 
            }else{
              res.json({
                "error":true,
                "message":error
              })
            }
          }
        )
      }
    }
    
  }

module.exports = daoCommon;
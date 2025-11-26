
const connect = require('../../config/dbconfig')
   //need findAll, sort, findbyid, findprogram, create and update
    const actorsDao = {
        table: 'actors',
        findAllActors(res, table, id) {
            let sql = `SELECT * FROM actors`;
            connect.execute(
                sql,
                [id],
                (error, rows) => {
                    if (!error) {
                        if (rows.length === 1) {
                            res.json(...rows);
                        } else {
                            res.json(rows);
                        }
                    } else {
                        console.log(`DAO Error: ${error}`);
                        res.json({
                            message: "error",
                            table: `${table}`,
                            error: error,
                        });
                    }
                }
            );
        },
    sort: (res, table, sorter) => {
        connect.query(
        `SELECT * FROM actors ORDER BY lName;`,
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
                'table': `actors`,
                'error': error
            })
            }
        }
        )
    },
        findProgramsByActors(res, table, id) {
            let sql = `SELECT 
                a.actors_id, 
                a.fName, 
                a.lName,
                ImagePath,
                GROUP_CONCAT(CONCAT(p.title,' (', p.yr_released, ')') ORDER BY p.title SEPARATOR ', ') AS programs
            FROM actors a
            LEFT JOIN programs_to_actors pta ON a.actors_id = pta.actors_id
            LEFT JOIN programs p ON pta.programs_id = p.programs_id
            WHERE a.actors_id = ?
            GROUP BY a.actors_id, a.fName, a.lName, ImagePath`;
            connect.execute(
                sql,
                [id],
                (error, rows) => {
                    if (!error) {
                        if (rows.length === 1) {
                            res.json(...rows);
                        } else {
                            res.json(rows);
                        }
                    } else {
                        console.log(`DAO Error: ${error}`);
                        res.json({
                            message: "error",
                            table: `actors`,
                            error: error,
                        });
                    }
                }
            );
        }, findById: (res, table, id) => {
        connect.query(
        `SELECT * FROM actors WHERE actors_id = ${id};`,
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
                'table': `actors`,
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
        `INSERT INTO actors SET ${fields.join(' = ?,')} = ?`,
        values, 
        (error, dbres) => {
          if (!error) {
            res.json({
              last_id: dbres.insertId
            })
          } else {
            console.log(`actorsDao error: `, error)
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
          `UPDATE actors
          SET ${fields.join(' = ?,')} = ? 
          WHERE actors_id = ?;`,
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
};

    module.exports = actorsDao;
 //need findAll, sort, findbyid, findprogram, create and update
const connect = require('../../config/dbconfig')

const directorsDao = {
    table: 'directors',
    //3 Byprogram
    findProgramsByDirectors(res, table, id) {       
        let sql = `SELECT 
            d.directors_id, 
            d.fName, 
            d.lName,
            GROUP_CONCAT(CONCAT(p.title,' (', p.fivePointRating, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM directors d
        LEFT JOIN programs_to_directors ptd ON d.directors_id = ptd.directors_id
        LEFT JOIN programs p ON ptd.programs_id = p.programs_id
        WHERE d.directors_id = ?
        GROUP BY d.directors_id, d.fName, d.lName, p.fivePointRating ,p.title`;
        
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
                        table: `directors`,
                        error: error,
                    }); 
                }
            }
        );
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
                `INSERT INTO directors SET ${fields.join(' = ?,')} = ?`,
                values, 
                (error, dbres) => {
                if (!error) {
                    res.json({
                    last_id: dbres.insertId
                    })
                } else {
                    console.log(`directorsDao error: `, error)
                }
                }
            )
            }
        },
        // 8 patch
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
          `UPDATE directors
          SET ${fields.join(' = ?,')} = ? 
          WHERE directors_id = ?;`,
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

module.exports = directorsDao
const connect = require('../../config/dbconfig')
const actorsDao = {
        table: 'actors',
    // 1. findProgramBy
    findProgramsByActors(res, table, id) {
        let sql = `SELECT 
          a.actors_id,
          a.fName, 
          a.lName,
          a.ImagePath,
          a.character,
          GROUP_CONCAT(CONCAT(p.title,' (', p.yr_released, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM actors a
        LEFT JOIN programs_to_actors pta ON a.actors_id = pta.actors_id
        LEFT JOIN programs p ON pta.programs_id = p.programs_id
        WHERE a.actors_id = ?
        GROUP BY a.actors_id, a.fName, a.lName`;
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
        },
      findActorWhoDirect(res, table) {
    let sql = `SELECT a.actors_id, a.fName, a.lName, a.character, d.directors_id, d.fName, d.lName, p.title, p.programs_id
    FROM actors a
    
    JOIN programs_to_actors pta ON a.actors_id = pta.actors_id
    JOIN programs p ON pta.programs_id = p.programs_id
    JOIN programs_to_directors ptd ON p.programs_id = ptd.programs_id
    JOIN directors d ON ptd.directors_id = d.directors_id
    WHERE a.fName = d.fName
    AND a.lName = d.lName` 
      connect.execute(
          sql,
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
        }
      ,
      findActorWithDirandfiveStarRating(res, table, id) {
      let sql = `SELECT a.actors_id, a.fName, a.lName, a.character, d.directors_id, d.fName, d.lName, p.title AS programs, p.fiveStarRating, p.programs_id
      FROM actors a
      JOIN programs_to_actors pta ON a.actors_id = pta.actors_id
      JOIN programs p ON pta.programs_id = p.programs_id
      JOIN programs_to_directors ptd ON pta.programs_id = ptd.programs_id
      JOIN directors d ON ptd.directors_id = d.directors_id
      WHERE a.actors_id = ?;`
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
        }
}
module.exports = actorsDao;
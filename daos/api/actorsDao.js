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
        }
    };
module.exports = actorsDao;
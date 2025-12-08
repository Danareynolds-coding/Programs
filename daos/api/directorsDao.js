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
        GROUP BY d.directors_id, d.fName, d.lName`;
        
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
    }
};
module.exports = directorsDao;
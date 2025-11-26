 //need findAll, sort, findbyid, findprogram, create and update
const connect = require('../../config/dbconfig')

const genreDao = {
    table: 'genre',
    findProgramsByGenre(res, table, id) {
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            GROUP_CONCAT(CONCAT(p.title,' (', p.yr_released, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?
        GROUP BY g.genre_id, g.genre`;
        
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
    }
}
module.exports = genreDao
 //need findAll, sort, findbyid, findprogram, create and update
const connect = require('../../config/dbconfig')


const genreDao = {
    table: 'genre',
    
    // 1 Byprograms
    findProgramsByGenre:(res, table, id)=> {
        //unique#1//
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            p.title AS programs,
            p.rating
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?
        ;`
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
                        table: `genre`,
                        error: error,
                    });
                }
            }
        );
    },
    //5. unique
    findDescriptionByGenreId:(res, table, id)=> {
        //unique#2//
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            p.title AS programs,
            p.description
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?`
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
                        table: `genre`,
                        error: error,
                    });
                }
            }
        );
    },
    findAnimationByGenre:(res, table)=> {
    let sql = `SELECT 
            g.genre_id,
            g.genre, 
            p.title AS programs,
            p.description
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?`
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
                        table: `genre`,
                        error: error,
                    });
                }
            }
        );
    }
};


module.exports = genreDao;
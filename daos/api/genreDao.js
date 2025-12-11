 //need findAll, sort, findbyid, findprogram, create and update
const connect = require('../../config/dbconfig')


const genreDao = {
    table: 'genre',
    findAnimationByGenre:(res, table)=> {
    let sql = `SELECT 
            g.genre_id,
            g.genre, 
            p.title AS programs,
            p.animationType
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id;`
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
                        table: `genre`,
                        error: error,
                    });
                }
            }
        );
    },  
    findDirectorByGenre (res, table) {
        const sql = `SELECT g.genre_id, g.genre,
            CONCAT(d.fName, ' ', d.lName) AS director
            FROM genre g
            JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
            JOIN programs p ON ptg.programs_id = p.programs_id
            JOIN programs_to_directors ptd ON p.programs_id = ptd.programs_id
            JOIN directors d ON ptd.directors_id = d.directors_id
            ORDER BY g.genre ASC;`;
            connect.query(
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
                    table: `genre`,
                    error: error,
                });
            }
        });
    },    

    findProgramsByGenre: (res, table, id) => {
        let sql = ` SELECT 
            g.genre_id,
            g.genre, 
            p.title,
            p.yr_released,
            p.rating
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?;    `
       
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
    findDescriptionByGenre:(res, table, id)=> {
        //unique#2//
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            p.title,
            p.description
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?;`
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
};
module.exports = genreDao;
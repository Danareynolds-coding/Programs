const connect = require('../../config/dbconfig');

const programsDao = {
    table: 'programs',
  //1. same as find all
    findProgramsInfo (res, table) {
        const sql = `SELECT p.programs_id, p.title, p.rating, p.animationType, p.runtime, p.yr_released, p.productionCo, p.budget, p.grossProfit, p.showing, p.posterURL, p.description, p.fivePointRating,
            CASE WHEN p.budget IS NULL THEN NULL ELSE p.budget END budget,
            CASE WHEN p.gross IS NULL THEN '' ELSE p.gross END gross
            FROM programs p
             JOIN productionCo c using productionCo_id
            JOIN program_to_actors pa ON p.programs_id = pa.programs_id
            JOIN actors a ON pa.actors_id = a.actors_id
            JOIN program_to_directors pd ON p.programs_id = pd.programs_id
            JOIN directors d ON pd.directors_id = d.directors_id
            JOIN program_to_genre pg ON p.programs_id = pg.programs_id
            JOIN genre g ON pg.genre_id = g.genre_id
            JOIN program_to_streaming ps ON p.programs_id = ps.programs_id
            ORDER BY p.title ASC;`;
           
        connect.query(sql, (error, rows) => {
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
                    table: `programs`,
                    error: error,
                });
            }
        });
    },
    
    findProgramsWithActors(res, table, id) {
        let sql = `SELECT 
                p.programs_id,
                p.title,
                CONCAT(a.lName, ', ', a.fName) AS actors, a.character
            FROM programs p
            LEFT JOIN programs_to_actors pta ON p.programs_id = pta.programs_id
            LEFT JOIN actors a ON pta.actors_id = a.actors_id
            WHERE p.programs_id = ?
            GROUP BY p.programs_id, p.title, a.fName, a.lName, a.character;`
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
                        table: `programs`,
                        error: error,
                    });
                }
            }
        );
    },
    // 3B programWithDirectors
     findProgramsWithDirectors(res, table, id) {
        let sql = `SELECT 
                p.programs_id,
                p.title,
                CONCAT(d.lName, ', ', d.fName) AS directors
            FROM programs p
            LEFT JOIN programs_to_directors ptd ON p.programs_id = ptd.programs_id
            LEFT JOIN directors d ON ptd.directors_id = d.directors_id
            WHERE p.programs_id = ?
            GROUP BY p.programs_id, p.title, d.fName, d.lName;`
        connect.execute(
            sql,
            [id],
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log(`DAO Error: ${error}`);
                    res.json({
                        message: "error",
                        table: `programs`,
                        error: error,
                    });
                }
            }
        );
    }, 
      // 3C findgenreByProgramId   
    findProgramsWithGenre(res, table, id) {
        let sql = `SELECT 
                p.programs_id,
                p.title,
                g.genre_id,
                g.genre
            FROM programs p
            LEFT JOIN programs_to_genre ptg ON p.programs_id = ptg.programs_id
            LEFT JOIN genre g ON ptg.genre_id = g.genre_id
            WHERE p.programs_id = ?
            `;
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
                        table: `programs`,
                        error: error,
                    });
                }
            }
        );
    },
      // 3C findproductionCoByProgramId   
    findProgramsWithProductionCo(res, table, id) {
        let sql = `SELECT 
                p.programs_id,
                p.title,
                p.productionCo_id,
                pc.productionCo
                FROM programs p
            JOIN productionCo pc ON pc.productionCo_id = p.productionCo_id
            WHERE p.programs_id = ?
            GROUP BY p.programs_id, p.title, pc.productionCo`;
        connect.execute(
            sql,
            [id],
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log(`DAO Error: ${error}`);
                    res.json({
                        message: "error",
                        table: `programs`,
                        error: error,
                    });
                }
            }
        );
    },
    // 3E streaming
    findProgramsWithStreaming(res, table, id) {
        let sql = `SELECT 
                p.programs_id,
                p.title,
                s.streaming
                FROM programs p
            LEFT JOIN programs_to_streaming pts ON p.programs_id = pts.programs_id
            LEFT JOIN streaming s ON pts.streaming_id = s.streaming_id
            WHERE p.programs_id = ?
            GROUP BY p.programs_id, p.title, s.streaming;`
        connect.execute(
            sql,
            [id],
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(rows);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log(`DAO Error: ${error}`);
                    res.json({
                        message: "error",
                        table: `programs`,
                        error: error,
                    });
                }
            }
        );
    }, 
    // 5. unique1
    findShowingTypePrograms(res, table, sorter) {
        connect.query(
            `SELECT * FROM programs WHERE showing = ?;`,
            [sorter],
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(rows[0]);
                    } else {
                        res.json(rows);
                    }
                } else {
                    console.log(`Dao Error: ${error}`);
                    res.json({
                        message: 'error',
                        table: `programs`,
                        error: error
                    });
                }
            }
        );
    },
   
   

       
module.exports = programsDao;

















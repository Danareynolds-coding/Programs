const connect = require('../../config/dbconfig');

const programsDao = {
    table: 'programs',
  // same as find all
    findMovieInfo (res, table) {
        const sql = `SELECT p.programs_id, p.title, p.rating, p.animationType, p.runtime, p.yr_released, p.productionCo, p.budget, p.grossProfit, p.showing, p.posterURL, p.description, p.fivePointRating,
            CASE WHEN p.budget IS NULL THEN NULL ELSE p.budget END budget,
            CASE WHEN p.gross IS NULL THEN '' ELSE p.gross END gross
            FROM programs p
            ORDER BY p.programs_id, p.title;`;
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
  
    sort(res, table, sorter) {
        connect.query(
            `SELECT * FROM programs ORDER BY ${sorter};`,
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
    //unique1//
    findTheatrePrograms(res, table, sorter) {
        connect.query(
             `SELECT programs FROM programs WHERE showing = 'theatre' AND yr_released = 2003`,
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
        findLiveActionPrograms (res, table, sorter) {
        connect.query(
            `SELECT programs FROM programs WHERE animationType = 'Live Action'`,
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
        
    findGenreByPrograms(res, table, id) {
        let sql = `SELECT 
                p.programs_id,
                p.programs,
                GROUP_CONCAT(CONCAT(g.genre, ')') ORDER BY g.genre SEPARATOR ', ') AS genre
            FROM programs p
            LEFT JOIN programs_to_genre ptg ON p.programs_id = ptg.programs_id
            LEFT JOIN genre g ON ptg.genre_id = g.genre_id
            WHERE p.programs_id = ?
            GROUP BY p.programs_id, p.programs, g.genre`;
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
    findById (res, table, id) {
        connect.query(
            `SELECT * FROM programs WHERE programs_id = ${id};`,
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

    create (req, res, table) {
        if (Object.keys(req.body).length === 0) {
            res.json({
                error: true,
                message: "no fields to create"
            });
        } else {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            connect.execute(
                `INSERT INTO programs SET ${fields.join(' = ?,')} = ?`,
                values,
                (error, dbres) => {
                    if (!error) {
                        res.json({
                            last_id: dbres.insertId
                        });
                    } else {
                        console.log(`programsDao error: `, error);
                    }
                }
            );
        }
    },
        update(req, res, table) {
        if (isNaN(req.params.id)) {
            res.json({
                error: true,
                message: "id must be a number"
            });
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                error: true,
                message: "No fields to update"
            });
        } else {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            connect.execute(
                `UPDATE programs
                SET ${fields.join(' = ?,')} = ?
                WHERE genre_id = ?;`,
                [...values, req.params.id],
                (error, dbres) => {
                    if (!error) {
                        res.json({
                            status: "updated",
                            changedRows: dbres.changedRows
                        });
                    } else {
                        res.json({
                            error: true,
                            message: error
                        });
                    }
                }
            );
        }
    }
};

module.exports = programsDao;

















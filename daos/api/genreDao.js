 //need findAll, sort, findbyid, findprogram, create and update
const connect = require('../../config/dbconfig')


const genreDao = {
    table: 'genre',

    findAllGenres(res, table, id) {
        let sql = `SELECT * FROM genre`;
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

    sort(res, table, sorter) {
        connect.query(
            `SELECT * FROM genre ORDER BY genre;`,
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
                        table: `genre`,
                        error: error
                    });
                }
            }
        );
    },

    findProgramsByGenre(res, table, id) {
        //unique#1//
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            GROUP_CONCAT(CONCAT(p.title,' (', p.rating, ')') ORDER BY p.title SEPARATOR ', ') AS programs
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
                        table: `genre`,
                        error: error,
                    });
                }
            }
        );
    },

    findDiscriptionByGenre(res, table, id) {
        //unique#2//
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            GROUP_CONCAT(CONCAT(p.title,' (', p.description, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM genre g
        LEFT JOIN programs_to_genre ptg ON g.genre_id = ptg.genre_id
        LEFT JOIN programs p ON ptg.programs_id = p.programs_id
        WHERE g.genre_id = ?
        GROUP BY g.genre_id, g.genre, p.description, p.title`;

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

    findById(res, table, id) {
        connect.query(
            `SELECT * FROM genre WHERE genre_id = ${id};`,
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
                        table: `genre`,
                        error: error
                    });
                }
            }
        );
    },

    create(req, res, table) {
        //Object.key returns array of keys
        if (Object.keys(req.body).length === 0) {
            res.json({
                error: true,
                message: "no fields to create"
            });
        } else {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            connect.execute(
                `INSERT INTO genre SET ${fields.join(' = ?,')} = ?`,
                values,
                (error, dbres) => {
                    if (!error) {
                        res.json({
                            last_id: dbres.insertId
                        });
                    } else {
                        console.log(`genreDao error: `, error);
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
            const fields = Object.keys(req.body); //array of keys
            const values = Object.values(req.body); //array of values

            connect.execute(
                `UPDATE genre
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

module.exports = genreDao;
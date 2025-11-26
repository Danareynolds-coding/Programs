const connect = require('../../config/dbconfig')

const streamingDao = {
  table:'streaming',
      findAllStreaming(res, table, id) {
        let sql = `SELECT * FROM streaming`;
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
                        table: `streaming`,
                        error: error,
                    });
                }
            }
        );
    },

    sort(res, table, sorter) {
        connect.query(
            `SELECT * FROM streaming ORDER BY streaming;`,
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
                        table: `streaming`,
                        error: error
                    });
                }
            }
        );
    },
    findProgramsByStreaming(res, table, id) {
        let sql = `SELECT
            s.streaming_id, s.streaming,
        GROUP_CONCAT(CONCAT(p.title,' (', p.productionCo, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM streaming s
        LEFT JOIN programs_to_streaming pts ON s.streaming_id = pts.streaming_id
        LEFT JOIN 
        programs p ON pts.programs_id = p.programs_id
        WHERE s.streaming_id = ?
        GROUP BY s.streaming_id, s.streaming`;
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
                        table: `streaming`,
                        error: error,
                    }); 
                }
            }
        );  
    }
        findRatingByStreaming(res, table, id) {
        //unique#2//
        let sql = `SELECT 
            g.genre_id,
            g.genre, 
            GROUP_CONCAT(CONCAT(p.title,' (', p.rating, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM streaming s
        LEFT JOIN programs_to_streaminge pts ON s.streaming_id = pts.streaming_id
        LEFT JOIN programs p ON pts.programs_id = p.programs_id
        WHERE s.streaming_id = ?
        GROUP BY s.streaming_id, s.streaming, p.rating, p.title`;

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
                        table: `streaming`,
                        error: error,
                    });
                }
            }
        );
    },
    findById(res, table, id) {
        connect.query(
            `SELECT * FROM streaming WHERE streaming_id = ${id};`,
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
                        table: `streaming`,
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
                `INSERT INTO streaming SET ${fields.join(' = ?,')} = ?`,
                values,
                (error, dbres) => {
                    if (!error) {
                        res.json({
                            last_id: dbres.insertId
                        });
                    } else {
                        console.log(`streamingDao error: `, error);
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
                WHERE streaming_id = ?;`,
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
module.exports = streamingDao
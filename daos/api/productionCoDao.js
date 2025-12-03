
const connect = require('../../config/dbconfig')

const productionCoDao = {
    table: 'productionCo',
    // 1.findall
    findAllProductionCo(res, table, id) {
        let sql = `SELECT * FROM productionCo`;
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
                        table: `productionCo`,
                        error: error,
                    });
                }
            }
        );
    },
    //2. sort
    sort(res, table, sorter) {
        connect.query(
            `SELECT * FROM productionCo ORDER BY ${sorter};`,
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
                        table: `productionCo`,
                        error: error
                    });
                }
            }
        );
    },
    //3 byPrograms
    findProgramsByProductionCo(res, table, id) {
        let sql = `SELECT
            pc.productionCo_id,
            pc.productionCo,
            p.programs_id,
            p.title AS programs_title 
            FROM productionCo AS pc
            JOIN programs AS p ON pc.productionCo_id = p.productionCo_id
            WHERE pc.productionCo_id = ?`;
        connect.query(sql, [id], (error, rows) => {
            if (!error) {
                if (rows.length === 1) {
                    res.json(...rows);
                } else {
                    res.json(rows);
                }
            } else {
                console.log('Dao error', error);
                res.json({
                    message: 'error',
                    table: table,
                    error: error
                });
            }
        });
    },
    // 5. unique1
    findfivePointRatingByProductionCo(res, table) {
        let sql = `SELECT 
            pc.productionCo_id,
            pc.productionCo,
            p.fivePointRating AS programs_fivePointRating,
            p.title AS programs_title
            FROM productionCo AS pc
            INNER JOIN programs AS p ON pc.productionCo_id = p.productionCo_id
            ORDER BY fivePointRating DESC;`
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
                        table: `productionCo`,
                        error: error,
                    });
                }
            }
        );
    },
    // 7. Post
    create(req, res, table) {
        if (Object.keys(req.body).length === 0) {
            res.json({
                error: true,
                message: "no fields to create"
            });
        } else {
            const fields = Object.keys(req.body);
            const values = Object.values(req.body);
            connect.execute(
                `INSERT INTO productionCo SET ${fields.join(' = ?,')} = ?`,
                values,
                (error, dbres) => {
                    if (!error) {
                        res.json({
                            last_id: dbres.insertId
                        });
                    } else {
                        console.log(`productionCoDao error: `, error);
                    }
                }
            );
        }
    },
    //8.patch
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
                `UPDATE productionCo
                SET ${fields.join(' = ?,')} = ? 
                WHERE productionCo_id = ?;`,
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


module.exports = productionCoDao;


const connect = require('../../config/dbconfig')

const productionCoDao = {
    table: 'productionCo',
  
       //3 byPrograms
    findProgramsByProductionCo(res, table, id) {
        let sql = `SELECT
            pc.productionCo_id,
            pc.productionCo,
            p.programs_id,
            GROUP_CONCAT(CONCAT(p.title,'',p.program_id AS programs 
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
    }
};
module.exports = productionCoDao;

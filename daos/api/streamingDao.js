const connect = require('../../config/dbconfig')

const streamingDao = {
  table:'streaming',
  findProgramsByStreaming(res, table, id) {
        let sql = `SELECT
            s.streaming_id, s.streaming,
        GROUP_CONCAT(CONCAT(p.title,' (', p.yr_released, ')') ORDER BY p.title SEPARATOR ', ') AS programs
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
                        table: `${table}`,
                        error: error,
                    }); 
                }
            }
        );  
    }
};
module.exports = streamingDao
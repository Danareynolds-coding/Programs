const connect = require('../../config/dbconfig')

const streamingDao = {
  table:'streaming',
     
    //3 programsBy
    findProgramsByStreaming(res, table, id) {
        let sql = `SELECT
            s.streaming_id, 
            s.streaming,
            p.title AS programs,
            p. rating
        FROM streaming s
        JOIN programs_to_streaming pts ON s.streaming_id = pts.streaming_id
        JOIN programs p ON pts.programs_id = p.programs_id
        WHERE s.streaming_id = ?;`
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
    findRatingByStreaming(res, table) {
        //5  unique#1/
        let sql = `SELECT 
            s.streaming_id,
            s.streaming, 
            GROUP_CONCAT(CONCAT(p.title,' (', p.rating, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM streaming s
        LEFT JOIN programs_to_streaming pts ON s.streaming_id = pts.streaming_id
        LEFT JOIN programs p ON pts.programs_id = p.programs_id
        GROUP BY s.streaming_id, s.streaming
        ORDER BY s.streaming, p.rating, p.title`;
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
                        table: `streaming`,
                        error: error,
                    });
                }
            }
        );
    },
    findDescriptionByStreaming(res, table, id) {
        //6  unique#2/
        let sql = `SELECT 
            s.streaming, 
            p.title,
            p.description
            GROUP_CONCAT(CONCAT(p.title,' (', p.description, ')') ORDER BY p.title SEPARATOR ', ') AS programs
        FROM streaming s
        LEFT JOIN programs_to_streaming pts ON s.streaming_id = pts.streaming_id
        LEFT JOIN programs AS p ON pts.programs_id = p.programs_id
        WHERE s.streaming_id = ?
        GROUP BY s.streaming, p.description, p.title`;
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
};
module.exports = streamingDao;
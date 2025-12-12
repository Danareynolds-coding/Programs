const connect = require('../../config/dbconfig')

const streamingDao = {
  table:'streaming',
     
    findRatingByStreaming(res, table) {
        //2  unique#1/
        let sql = `SELECT 
            s.streaming, 
            p.title,
            p.rating
        FROM streaming s
        LEFT JOIN programs_to_streaming pts ON s.streaming_id = pts.streaming_id
        LEFT JOIN programs p ON pts.programs_id = p.programs_id
        ORDER BY s.streaming;`
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
        let sql = `SELECT 
            s.streaming, 
            p.title,
            p.description
        FROM streaming s
        LEFT JOIN programs_to_streaming pts ON s.streaming_id = pts.streaming_id
        LEFT JOIN programs AS p ON pts.programs_id = p.programs_id
        WHERE s.streaming_id = ?`;
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
     findProgramsByStreaming(res, table, id) {
        let sql = `SELECT
            s.streaming,
            p.title,
            p.rating
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
};
module.exports = streamingDao;
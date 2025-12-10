 //need findAll, sort, findbyid, findprogram, create and update
const connect = require('../../config/dbconfig')

const directorsDao = {
    table: 'directors',
    findProductionCoByDirectors: (req, res, table) => {
        let sql = `SELECT d.directors_id, d.fName, d.lName, pc.productionCo 
            FROM directors d
            INNER JOIN programs_to_directors ptd ON d.directors_id = ptd.directors_id
            INNER JOIN programs p ON ptd.programs_id = p.programs_id
            INNER JOIN productionCo pc ON p.productionCo_id = pc.productionCo_id;`
        connect.execute(
            sql,
            (error, rows) => {
               
                if (!error) {
                    if (rows.length === 1) {
                        res.json(rows[0]);
                    } else {
                       
                        res.json(rows);
                    }
                } else {
                    console.log(`DAO Error: ${error}`);
                    res.json({
                        message: "error",
                        table: `directors`,
                        error: error,
                    });
                }
            }
        )
    },
    findAnimationByDirectors: ( req, res, table) => {  
        let sql = `SELECT d.directors_id, d.fName, d.lName, p.title AS programs, p.animationType
        FROM directors d 
        JOIN programs_to_directors ptd ON d.directors_id = ptd.directors_id 
        JOIN programs p ON ptd.programs_id = p.programs_id 
        ORDER BY d.lName`
        connect.execute(
            sql,
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(rows[0]);
                    } else {
                        console.log(`row count: ${rows.length}`)
                        res.json(rows);
                    }
                } else {
                    console.log(`DAO Error: ${error}`);
                    res.json({
                        message: "error",
                        table: `directors`,
                        error: error,
                    }); 
                }
            }
        );
    },
    findProgramsByDirectors: (res, table, id) => {       
        let sql = `SELECT d.directors_id, d.fName, d.lName, p.title AS programs, p.fivePointRating 
        FROM directors d 
        JOIN programs_to_directors ptd ON d.directors_id = ptd.directors_id 
        JOIN programs p ON ptd.programs_id = p.programs_id 
        WHERE d.directors_id = ?;`
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
                        table: `directors`,
                        error: error,
                    }); 
                }
            }
        );
    }
};
module.exports = directorsDao;
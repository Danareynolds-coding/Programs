

const connect = require('../../config/dbconfig');

const programsDao = {
  table:'programs'
  //,
  // findMovieInfo: (res, table)=> {
  //   const sql =`SELECT p.programs_id, p.title, p.rating, p.animationType, p.runtime, p.yr_released, p.productionCo, p.budget, p.grossProfit, p.showing,  p.posterURL, p.description, p.fivePointRating,
  //     CASE
  //       WHEN p.budget IS NULL THEN
  //       ELSE p.budget
  //       END budget,
  //     CASE
  //       WHEN p.gross IS NULL THEN ''
  //       ELSE p.gross
  //       END gross
      
  //     FROM programs p
  //     ORDER BY p.programs_id, p.title;`

  //     connect.query(sql, (error, rows) => {
  //     if (!error) {
  //       if (rows.length === 1) {
  //         res.json(...rows);
  //       } else {
  //         res.json(rows);
  //       }
  //     } else {
  //       console.log(`DAO Error: ${error}`);
  //       res.json({
  //         message: "error",
  //         table: `${table}`,
  //         error: error,
  //       }); 
  //     }
  //   })
  //},
} 

module.exports = programsDao

















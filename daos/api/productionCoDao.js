const connect = require("../../config/dbconfig");

const productionCoDao = {
  table: "productionCo",
  findProductionCoByProgramsBefore1960: (res, table) => {
        let sql = `SELECT DISTINCT
          pc.productionCo,
          p.title,
          p.yr_released
          FROM productionCo AS pc
          INNER JOIN programs p ON pc.productionCo_id = p.productionCo_id
          WHERE p.yr_released < 1960;`
    connect.execute(sql, (error, rows) => {
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
    });
  },
  findprofitByProductionCo: (res, table) => {
    let sql = `SELECT 
            pc.productionCo,
            p.title,
            p.budget,
            p.grossProfit,
            p.yr_released
            FROM productionCo AS pc
            JOIN programs AS p ON pc.productionCo_id = p.productionCo_id
            ORDER BY p.grossProfit DESC;`;
    connect.execute(sql, (error, rows) => {
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
    });
  },
  findProgramsByProductionCo: (res, table, id) => {
    let sql = `SELECT
            pc.productionCo_id,
            pc.productionCo,
            p.title
            FROM productionCo AS pc
            JOIN programs AS p ON pc.productionCo_id = p.productionCo_id
            WHERE pc.productionCo_id = ?;`;
    connect.query
    (sql, 
        [id],
      (error, rows) => {
      if (!error) {
        if (rows.length === 1) {
          res.json(rows[0]);
        } else {
          res.json(rows);
        }
      } else {
        console.log("Dao error", error);
        res.json({
          message: "error",
          table: productionCo,
          error: error,
        });
      }
    });
  },
  findfivePointRatingByProductionCo: (res, table, id) => {
        let sql = `SELECT 
          pc.productionCo_id,
          pc.productionCo,
          p.fivePointRating,
          p.title 
          FROM productionCo AS pc
          INNER JOIN programs AS p ON pc.productionCo_id = p.productionCo_id
          WHERE pc.productionCo_id = ?;`
    connect.execute(
      sql,
      [id],
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
          table: `productionCo`,
          error: error,
        });
      }
      }
    );
  },
};
module.exports = productionCoDao;

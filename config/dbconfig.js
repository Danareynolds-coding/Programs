
const mysql = require('mysql2')
//pool enables mutiple connections for multiple querries
const pool = mysql.createPool({
  connectionLimit:10,
  host:'localhost',
  user:'root',
  password:'root',
  database:'programschristmasdb'
})

module.exports = pool
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: '29041995Stak4n0v$'
});

module.exports = db;

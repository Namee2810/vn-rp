const mysql = require("mysql2");

global.mysql = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "vn-rp"
});
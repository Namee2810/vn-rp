const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "vn-rp",
  password: ""
});
db.connect(err => {
  if (err) {
    console.log(err);
    console.log("Shutting down...");
    setTimeout(() => {
      process.exit();
    }, 5000);
  }
  else console.log(("Connected database"));
});

mp.query = async (q, params) => new Promise(
  (resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    }
    db.query(q, params, handler);
  });
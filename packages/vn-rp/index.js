require("./commands");
require("./events");
require("./db");


//test connect database
global.mysql.query(
  'SELECT * FROM `accounts`',
  function (err, res) {
    if (err) console.log(err);
    else console.log(res);
  }
);
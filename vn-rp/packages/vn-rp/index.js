require("./commands");
require("./events");
require("./db");
require("./events");
require("./commands");

//test connect database
global.mysql.query(
  'SELECT * FROM `test`',
  function (err, res) {
    if (err) console.log(err);
    else console.log("Connected database");
  }
);
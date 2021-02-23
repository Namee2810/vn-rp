mp.events.add("auth.register", (player, email, password) => {

})
mp.events.add("auth.registerVerify", (player, code) => {

})
mp.events.add("auth.login", (player, email, password) => {
  global.mysql.query(
    `SELECT * FROM accounts WHERE email='${email}' AND password='${password}'`,
    function (err, res) {
      if (err) console.log(err);
      if (res.length > 0) console.log("success");
    }
  );
})
mp.events.add("auth.forgot", (player, email) => {

})
mp.events.add("auth.forgotVerify", (player, code) => {

})
const sha256 = require("sha256");
const generateKey = require("../../modules/generateKey");
const rpc = require("rage-rpc");
const sendMail = require("../../modules/sendMail");

rpc.register("server:auth.register", async (data, player) => {
  const { email, password } = data;
  player = player.player;

  const verify = generateKey(9, false);
  hashPassword = sha256(password);

  // code: 1 = success, 2 = email exist, 3 = error
  let code;
  await global.mysql.promise().query(
    `INSERT INTO accounts (email, password, socialClub, verify, regIP) 
    VALUES ('${email}', '${hashPassword}', '${player.socialClub}','${verify}', '${player.ip}')`)
    .then(() => {
      sendMail(email, verify, 1);
      code = 1;
    })
    .catch(err => {
      if (err.code === "ER_DUP_ENTRY") code = 2;
      else {
        code = 3;
        console.log(err);
      }
    })
  return code;
});

rpc.register("server:auth.sendMailVerify", async (email) => {
  const verify = generateKey(9, false);
  console.log(email);

  let code;
  //code: 1 = success, 2 = error
  await global.mysql.promise().query(
    `UPDATE accounts SET verify='${verify}' WHERE email='${email}'`)
    .then(() => {
      sendMail(email, verify, 1);
      code = 1;
    })
    .catch(err => {
      console.log(err);
      code = 2
    })
  return code;
})

rpc.register("server:auth.registerVerify", async (data) => {
  const { email, verify } = data;

  let code;
  //code: 1 = success, 2 = fail, 3 = error
  await global.mysql.promise().query(
    `UPDATE accounts SET verify='1' WHERE email='${email}' AND verify='${verify}'`)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        code = 1;
      }
      else code = 2;
    })
    .catch(err => {
      console.log(err);
      code = 3
    })
  return code;
})

rpc.register("server:auth.forgot", async (email) => {
  const verify = generateKey(9, false);
  let code;
  //code: 1 = success, 2 = fail, 3 = error
  await global.mysql.promise().query(
    `UPDATE accounts SET forgotVerify='${verify}' WHERE email='${email}'`)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        sendMail(email, verify, 2);
        code = 1;
      }
      else code = 2;
    })
    .catch(err => {
      console.log(err);
      code = 3
    })
  return code;
})

rpc.register("server:auth.forgotVerify", async (data) => {
  const { email, verify } = data;
  console.log(email, verify);
  let code;
  //code: 1 = success, 2 = fail, 3 = error
  await global.mysql.promise().query(
    `UPDATE accounts SET forgotVerify='0' WHERE email='${email}' AND forgotVerify='${verify}'`)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        code = 1;
      }
      else code = 2;
    })
    .catch(err => {
      console.log(err);
      code = 3
    })
  return code;
})
rpc.register("server:auth.forgotChange", async (data) => {
  const { email, password } = data;
  const hashPassword = sha256(password);

  let code;
  //code: 1 = success, 2 = error
  await global.mysql.promise().query(
    `UPDATE accounts SET password='${hashPassword}' WHERE email='${email}'`)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        code = 1;
      }
    })
    .catch(err => {
      console.log(err);
      code = 2;
    })
  return code;
})
rpc.register("server:auth.login", async (data, player) => {
  const { email, password } = data;
  const ip = player.player.ip;
  const hashPassword = sha256(password);

  let code;
  //code: 1 = success, 2 = fail, 3 = not verify, 4 = error
  await global.mysql.promise().query(
    `UPDATE accounts SET lastIP='${ip}', lastDate=NOW() WHERE email='${email}' AND password='${hashPassword}'`)
    .then(([rows]) => {
      if (rows.affectedRows > 0) {
        code = 1;
      }
      else code = 2;
    })
    .catch(err => {
      console.log(err);
      code = 4;
    })
  await global.mysql.promise().query(
    `SELECT verify FROM accounts WHERE email='${email}' AND password='${hashPassword}'`)
    .then(([rows, fields]) => {
      if (rows[0].verify !== "1") code = 3;
    })
    .catch(err => {
      console.log(err);
      code = 4;
    })
  return code;
})
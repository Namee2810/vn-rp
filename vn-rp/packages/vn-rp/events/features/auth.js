const sha256 = require("sha256");
const { generateKey } = require("../../modules/common");
const rpc = require("rage-rpc");
const sendMail = require("../../modules/sendMail");
const { setPlayerData } = require("../features/player");

rpc.register("server:auth.register", async (data, player) => {
  const { email, password } = data;
  player = player.player;

  const verify = generateKey(9, false);
  hashPassword = sha256(password);

  // code: 1 = success, 2 = email exist, 3 = error
  let code;
  const res = await mp.query(
    `INSERT INTO accounts (email, password, socialClub, verify, regIP) 
    VALUES ('${email}', '${hashPassword}', '${player.rgscId}','${verify}', '${player.ip}')`)
    .catch(err => {
      if (err.code === "ER_DUP_ENTRY") code = 2;
      else {
        code = 3;
        console.log(err);
      }
    })
  if (res) {
    sendMail(email, verify, 1);
    code = 1;
  }
  return code;
});

rpc.register("server:auth.sendMailVerify", async (email) => {
  const verify = generateKey(9, false);

  let code;
  //code: 1 = success, 2 = error
  const res = await mp.query(
    `UPDATE accounts SET verify='${verify}' WHERE email='${email}'`)
    .catch(err => {
      console.log(err);
      code = 2
    })
  if (res) {
    sendMail(email, verify, 1);
    code = 1;
  }
  return code;
})

rpc.register("server:auth.registerVerify", async (data) => {
  const { email, verify } = data;

  let code;
  //code: 1 = success, 2 = fail, 3 = error
  const res = await mp.query(
    `UPDATE accounts SET verify='1' WHERE email='${email}' AND verify='${verify}'`)
    .catch(err => {
      console.log(err);
      code = 3
    })
  if (res.affectedRows > 0) code = 1;
  else code = 2;

  return code;
})

rpc.register("server:auth.forgot", async (email) => {
  const verify = generateKey(9, false);
  let code;
  //code: 1 = success, 2 = fail, 3 = error
  const res = await mp.query(
    `UPDATE accounts SET forgotVerify='${verify}' WHERE email='${email}'`)
    .catch(err => {
      console.log(err);
      code = 3
    })
  if (res.affectedRows > 0) {
    sendMail(email, verify, 2);
    code = 1;
  }
  else code = 2;

  return code;
})

rpc.register("server:auth.forgotVerify", async (data) => {
  const { email, verify } = data;
  console.log(email, verify);
  let code;
  //code: 1 = success, 2 = fail, 3 = error
  const res = await mp.query(
    `UPDATE accounts SET forgotVerify='0' WHERE email='${email}' AND forgotVerify='${verify}'`)

    .catch(err => {
      console.log(err);
      code = 3
    })
  if (res.affectedRows > 0) code = 1;
  else code = 2;

  return code;
})
rpc.register("server:auth.forgotChange", async (data) => {
  const { email, password } = data;
  const hashPassword = sha256(password);

  let code;
  //code: 1 = success, 2 = error
  const res = await mp.query(
    `UPDATE accounts SET password='${hashPassword}' WHERE email='${email}'`)
    .catch(err => {
      console.log(err);
      code = 2;
    })
  if (res.affectedRows > 0) code = 1;

  return code;
})
rpc.register("server:auth.login", async (data, player) => {
  const { email, password } = data;

  player = player.player;
  const ip = player.ip;
  const hashPassword = sha256(password);

  let code;
  const res = await mp.query(
    `SELECT id, email, socialClub, verify, type, regIP, regDate, lastIP, lastDate, coin, slot FROM accounts WHERE email='${email}' AND password='${hashPassword}'`)
    .catch(err => {
      console.log(err);
      code = 4;
    })
  if (res.length === 0) code = 2;
  else {
    if (res[0].verify !== "1") code = 3;
    else {
      code = 1;
      setPlayerData(player, "account", res[0]);
      mp.query(`UPDATE accounts SET lastIP='${ip}', lastDate=NOW() WHERE email='${email}'`);
    }
  }
  return code;
})
const rpc = require("rage-rpc");
const { setPlayerData, spawnPlayer } = require("./player");
const playerList = require("./playerList");


rpc.register("server:characters.customize", (_, player) => {
  player = player.player;
  player.position = new mp.Vector3(402.875, -996.474, -99);
  player.heading = 180;
})
rpc.register("server:characters.create", async (data, player) => {
  player = player.player;
  const { name, gender, headBlend, headOverlay, clothes, hairColor, slot } = data;

  let code;
  const res = await mp.query(`INSERT INTO characters (owner,name,gender,clothes,hairColor,headBlend,headOverlay)
    VALUES (${player.account.id},'${name}',${gender},'${clothes}','${hairColor}','${headBlend}','${headOverlay}')`)
    .catch(err => {
      if (err.code === "ER_DUP_ENTRY") code = 2;
      else {
        code = 3;
        console.log(err);
      }
    })
  if (res) {
    const value = res.insertId;
    setPlayerData(player, "slot", { slot, value })
    code = 1;
  }
  return code;
})
rpc.register("server:characters.select", async (slot, player) => {
  player = player.player;

  const res = await mp.query(`SELECT * FROM characters WHERE id=${player.account.slot[slot]}`)
    .catch(err => console.log(err));
  await setPlayerData(player, "player", res[0]);
  spawnPlayer(player, 1);
  playerList.add(player.id);
})
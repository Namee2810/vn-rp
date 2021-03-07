const rpc = require("rage-rpc");
let spawnPoints = require("../../configs/spawnPoints.json");

function spawnPlayer(player, first = 0) {
  if (first === 1) {
    player.logged = true;
    player.model = player.info.gender ? mp.joaat("mp_m_freemode_01") : mp.joaat("mp_f_freemode_01");
    for (let i = 0; i < 12; i++) player.setClothes(i, player.info.clothes[i], 0, 2);
    player.setHairColor(player.info.hairColor[0], player.info.hairColor[1]);
    player.setHeadBlend(player.info.headBlend[0], player.info.headBlend[1], 0,
      player.info.headBlend[0], player.info.headBlend[1], 0,
      player.info.headBlend[2], player.info.headBlend[2], 0);
    for (let i = 0; i < 13; i++) player.setHeadOverlay(i, [player.info.headOverlay[i], 1, 0, 0]);

    player.setProp(0, player.info.prop[0], 0);
    player.setProp(1, player.info.prop[1], 0);
    player.setProp(2, player.info.prop[2], 0);
    player.setProp(6, player.info.prop[3], 0);
    player.setProp(7, player.info.prop[4], 0);

    rpc.callBrowsers(player, "cef:show", "hud");
    rpc.callBrowsers(player, "cef:url", "/");
    player.outputChatBox(`Welcome to the server, ${player.info.name}!`);
  }
  player.spawn(spawnPoints[0]);
  player.heading = spawnPoints[0].r;
  player.dimension = 0;

}

function setPlayerData(player, option, data) {
  switch (option) {
    case "account": {
      delete data.verify;
      player.account = data;
      player.account.slot = data.slot.split(",").map(item => +item);
      break
    }
    case "slot": {
      const { slot, value } = data;
      console.log(slot, value);
      player.account.slot[slot] = value;
      updatePlayerData(player, "slot");
      break
    }
    case "player": {
      player.info = data;
      player.info.clothes = player.info.clothes.split(",").map(item => +item);
      player.info.hairColor = player.info.hairColor.split(",").map(item => +item);
      player.info.headBlend = player.info.headBlend.split(",").map(item => +item);
      player.info.headOverlay = player.info.headOverlay.split(",").map(item => +item);
      player.info.prop = player.info.prop.split(",").map(item => +item);

      break;
    }
    default: {
      player.info[option] = data;
      break
    }
  }
}
function updatePlayerData(player, option) {
  const account = player.account.id;
  const id = player.info.id
  switch (option) {
    case "slot": {
      const slot = player.account.slot.join(",");
      mp.query(`UPDATE accounts SET slot='${slot}' WHERE id=${account}`).catch(err => console.log(err));
      break
    }
    case "cash": {
      mp.query(`UPDATE characters SET cash=${player.info.cash} WHERE id=${id}`).catch(err => console.log(err));
      break
    }

    default: break
  }
}

rpc.register("server:getPlayerData", async (option, player) => {
  player = player.player;
  switch (option) {
    case "account": {
      let slotData = [...player.account.slot];
      for (let i = 0; i < 3; i++) if (slotData[i] > 0) {
        const res = await mp.query(`SELECT * FROM characters WHERE id=${slotData[i]}`)
          .catch(err => console.log(err));
        const { name, level, exp, cash, bank, job, faction } = res[0];
        slotData[i] = { name, level, exp, cash, bank, job, faction };
      }
      return { account: player.account, slotData };
    }
    default: return player.info[option];
  }
});

module.exports = { setPlayerData, updatePlayerData, spawnPlayer };
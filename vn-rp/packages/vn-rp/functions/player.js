const rpc = require("rage-rpc");

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
    default: {
      player.info[option] = data;
      break
    }
  }
}
function updatePlayerData(player, option) {
  const id = player.account.id;
  switch (option) {
    case "slot": {
      const slot = player.account.slot.join(",");
      mp.query(`UPDATE accounts SET slot='${slot}' WHERE id=${id}`).catch(err => console.log(err));
      break
    }

    default: {
      mp.query("UPDATE characters");
      break
    }
  }
}

rpc.register("server:getPlayerData", async (option, player) => {
  player = player.player;
  switch (option) {
    case "account": {
      let slotData = player.account.slot;
      for (let i = 0; i < 3; i++) if (slotData[i] > 0) {
        const res = await mp.query(`SELECT * FROM characters WHERE id=${slotData[i]}`)
          .catch(err => console.log(err));
        slotData[i] = res;
      }
      return { account: player.account, slotData };
    }
    default: return player.info[option];
  }
});

module.exports = { setPlayerData, updatePlayerData };
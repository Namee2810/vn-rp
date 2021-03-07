const rpc = require("rage-rpc");
let playerList = [];

function updatePlayerList() {
  setInterval(() => {
    playerList = [];
    mp.players.forEach(p => {
      if (!p.logged) return true;
      playerList.push({
        id: p.id,
        name: p.info.name,
        level: p.info.level,
        ping: p.ping,
        type: p.account.type,
        faction: !p.info.faction > 0 ? 0 : {
          name: global.factions[p.info.faction - 1].name,
          color: global.factions[p.info.faction - 1].color
        }
      });
    })
  }, 5000);
}

rpc.register("server:playerList.get", () => playerList);

module.exports = updatePlayerList;
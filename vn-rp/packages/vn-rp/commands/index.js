require("./admin");

global.getPlayerID = value => {
  if (!isNaN(value)) return mp.players.at(value);
  else {
    let result;
    mp.players.forEach(player => {
      if (result) return;
      if (player.name.includes(valye)) result = mp.player.at(player.id);
    })
    return result;
  }
}
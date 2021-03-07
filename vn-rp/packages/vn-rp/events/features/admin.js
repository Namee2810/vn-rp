const { updatePlayerData } = require("./player");
const rpc = require("rage-rpc");

function isAdmin(player, level = 1) {
  if (player.info.admin >= level) return true;
  return false
}
function isHelper(player, level = 0) {
  if (player.info.helper > level) return true;
  return false
}
function giveCash(player, cash) {
  player.info.cash += Number(cash);
  rpc.callBrowsers(player, "cef:HUD", { type: "cash", value: player.info.cash })
  updatePlayerData(player, "cash");
}
function sendAdmin(level = 0, message) {
  message = `!{FF0000}ADMIN!{FFFFFF}: ${message}`;
  mp.players.forEach(p => {
    if (isAdmin(p, level)) p.outputChatBox(message);
  })
}

module.exports = { isAdmin, isHelper, giveCash, sendAdmin };
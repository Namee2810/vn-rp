const { isAdmin } = require("./features/admin");

function sendMsgToNearPlayer(player, text, radius = 50) {
  if (isAdmin(player)) text = `[${player.id}] !{#FF0000}${player.info.name}!{#FFFFFF} nói: ${text} !`;
  else text = `[${player.id}] ${player.info.name} nói: ${text} !`;
  mp.players.forEachInRange(player.position, radius, p => {
    p.outputChatBox(text);
  });
}

mp.events.add("playerChat", (player, text) => {
  if (text.trim().length === 0) return;
  sendMsgToNearPlayer(player, text)
})
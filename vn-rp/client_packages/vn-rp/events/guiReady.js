const rpc = require("./rage-rpc.min.js");

mp.events.add('guiReady', () => {
  rpc.call("client:auth.show");
  const player = mp.players.local;
  player.model = mp.game.joaat("mp_m_freemode_01");
});
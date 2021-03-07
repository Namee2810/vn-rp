const rpc = require("./rage-rpc.min.js");

mp.events.add('guiReady', () => {
  mp.browsers.new("package://vn-rp/CEF/index.html#/");
  rpc.call("client:auth.show");
  const player = mp.players.local;
  player.model = mp.game.joaat("mp_m_freemode_01");
});
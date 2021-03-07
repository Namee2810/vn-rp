const rpc = require("./rage-rpc.min.js");
let cam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);;
const player = mp.players.local;

//camera
rpc.register('camera.enable', () => {
  cam.setActive(true);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);

  player.freezePosition(true);
  mp.gui.cursor.show(true, true);
  mp.gui.chat.activate(false);
  mp.gui.chat.show(false);
  mp.game.ui.setMinimapVisible(true);
  mp.game.ui.displayRadar(false);
});

rpc.register('camera.set', (data) => {
  const { coord, point } = data;
  if (coord !== 0) cam.setCoord(coord[0], coord[1], coord[2]);
  if (coord !== 0) cam.pointAtCoord(point[0], point[1], point[2]);
});

rpc.register('camera.disable', () => {
  cam.setActive(false);
  mp.game.cam.renderScriptCams(false, false, 0, false, false);

  player.freezePosition(false);
  mp.gui.cursor.show(false, false);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.game.ui.setMinimapVisible(false);
  mp.game.ui.displayRadar(true);
});
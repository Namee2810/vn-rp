const rpc = require("./rage-rpc.min");

mp.keys.bind(0x59, true, () => {
  const player = mp.players.local;
  if (player.isSittingInAnyVehicle()) return global.noti(3, "Không thể thao tác trên phương tiện!")
  if (player.getVariable("enterJob") > 0) {
    rpc.callServer("getJob", player.getVariable("enterJob"));
  }
})
mp.keys.bind(0x4E, true, () => {
  const player = mp.players.local;
  if (player.isSittingInAnyVehicle()) return global.noti(3, "Không thể thao tác trên phương tiện!")
  if (player.getVariable("enterJob") > 0) {
    rpc.callServer("getJob", 0);
  }
})
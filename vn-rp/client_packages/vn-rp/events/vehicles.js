const rpc = require("./rage-rpc.min.js");
let vehSync;

function vehSyncHUD(value) {
  global.HUD("vehSync", value)
}
function playerEnterVehicle({ vehicle, seat }) {
  if (seat === -1) {
    mp.players.local.setConfigFlag(429, true);
    global.HUD("inVeh", true);
    vehSync = setInterval(() => {
      if (!mp.players.local.isSittingInAnyVehicle()) return playerLeaveVehicle(vehicle, seat)
      vehSyncHUD({
        speed: Math.round(vehicle.getSpeed() * 3.6), hp: Math.round(vehicle.getBodyHealth() / 10),
        engine: vehicle.getIsEngineRunning(), lock: vehicle.getDoorLockStatus()
      });
    }, 750)
  }
}
function playerLeaveVehicle(vehicle, seat) {
  if (vehSync) {
    global.HUD("inVeh", false)
    clearInterval(vehSync);
  }
}

mp.events.add({
  "playerLeaveVehicle": playerLeaveVehicle
});

mp.keys.bind(0x4E, true, () => {
  if (mp.gui.cursor.visible) return;
  rpc.callServer("server:vehicle.change", "engine")
});
mp.keys.bind(0x4C, true, () => {
  if (mp.gui.cursor.visible) return;
  rpc.callServer("server:vehicle.change", "lock")
});


rpc.register("client:playerEnteredVehicle", playerEnterVehicle);
const rpc = require("rage-rpc")

mp.events.add({
  "playerEnterVehicle": (player, vehicle, seat) => {
    rpc.callClient(player, "client:playerEnteredVehicle", { vehicle, seat })
  },
  "vehicleDamage": (vehicle, bodyHealthLoss, engineHealthLoss) => {
    if (bodyHealthLoss > 200 || vehicle.bodyHealth < 200) vehicle.engine = false;
  }
})

rpc.register("server:vehicle.change", (type, player) => {
  player = player.player;
  if (!player.vehicle) return;
  if (player.seat !== -1) return;
  const vehicle = player.vehicle;

  switch (type) {
    case "engine": {
      if (!vehicle.engine) {
        setTimeout(() => {
          if (vehicle.bodyHealth > 600) {
            vehicle.engine = true;
            global.noti(player, "success", "Phương tiện đã khởi động!")
          }
          else if (vehicle.bodyHealth > 200) {
            if (Math.round(Math.random() * 100) > 50) {
              vehicle.engine = true;
              global.noti(player, "success", "Phương tiện đã khởi động!")
            }
            else global.noti(player, "warning", "Khởi động thất bại, hãy thử lại!")
          }
          else global.noti(player, "error", "Phương tiện đã hư hỏng quá nặng, không thể khởi động!")
        }, 1000);
      }
      else {
        global.noti(player, "warning", "Phương tiện ngừng động cơ!")
        vehicle.engine = false;
      }
      break
    }
    case "lock": {
      vehicle.locked = !vehicle.locked;
      global.noti(player, vehicle.locked ? "warning" : "success", `Phương tiện đã ${vehicle.locked ? "khóa" : "mở khóa"}!`)
      break;
    }
    default: break
  }


});
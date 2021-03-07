const fs = require("fs");
const { isAdmin, giveCash, sendAdmin } = require("../../events/features/admin");
const { formatNumber, getRandomInt } = require("../../modules/common");
const saveFile = "./packages/savedpos.txt";
const { vehicleHashes } = require("../../configs/hashes");
const rpc = require("rage-rpc");
const { spawnPlayer } = require("../../events/features/player");

let adminVehs = [];

mp.events.addCommand({
  "save": (player) => {
    let pos = (player.vehicle) ? player.vehicle.position : player.position;
    let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

    fs.appendFile(saveFile, `${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"}\r\n`, (err) => {
      if (err) {
        player.notify(`~r~SavePos Error: ~w~${err.message}`);
      } else {
        player.notify(`~g~Position saved`);
      }
    });
  },
  "gotoxyz": (player, position) => {
    position = position.split(" ");
    player.position = new mp.Vector3(+position[0], +position[1], +position[2]);
  },
  "givecash": (player, _, id, cash) => {
    if (!isAdmin(player, 5)) return global.noti(player, 4, global.msg.adminRequire);
    if (!id || !cash) return global.noti(player, 3, "Cú pháp: /givecash [id] [cash]");
    const target = global.getPlayerID(id);
    if (!target) return global.noti(player, 3, "Người chơi không hợp lệ!");
    if (Number(cash).toString().length !== cash.length) return global.noti(player, 3, "Số cash không hợp lệ!");

    giveCash(target, cash);

    global.noti(player, 1, `Bạn đã gửi $${formatNumber(cash)} cho ${target.info.name}!`);
    global.noti(target, 1, `Bạn nhận được $${formatNumber(cash)} từ admin ${player.info.name}!`);
    sendAdmin(5, `${player.info.name} đã gửi ${target.info.name} $${formatNumber(cash)}.`)
  },
  "vehspawn": (player, model) => {
    if (!isAdmin(player, 2)) return global.noti(player, 4, global.msg.adminRequire);
    if (!model) return global.noti(player, 3, "Cú pháp: /vehspawn [model]");
    model = vehicleHashes[model];
    if (!model) return global.noti(player, 3, "Mã model không hợp lệ!");
    const adminVeh = mp.vehicles.new(model, player.position, {
      heading: player.heading,
      color: [
        [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)],
        [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)]
      ],
      locked: false,
      engine: false,
      dimension: player.dimension,
      numberPlate: "ADMIN"
    })
    adminVehs.push(adminVeh.id);
  },
  "vehdes": (player) => {
    if (!isAdmin(player, 2)) return global.noti(player, 4, global.msg.adminRequire);
    adminVehs.forEach(i => {
      const v = mp.vehicles.at(i);
      v.destroy();
    });
    global.noti(player, 1, "Tất cả phương tiện spawn đã hủy!");
    sendAdmin(2, `${player.info.name} đã hủy tất cả phương tiện spawn.`)
  },
  "vehrepair": (player) => {
    if (!isAdmin(player, 2)) return global.noti(player, 4, global.msg.adminRequire);
    if (!player.vehicle) return;
    player.vehicle.repair();
    global.noti(player, 1, "Phương tiện đã được sửa!");
  },
  "gotofac": (player, _, i) => {
    if (!isAdmin(player, 1)) return global.noti(player, 4, global.msg.adminRequire);
    if (!i) return global.noti(player, 3, "Cú pháp: /gotofac [faction id]");
    i -= 1;
    if (!global.factions[i]) return global.noti(player, 3, "Faction id không hợp lệ");
    player.position = new mp.Vector3(global.factions[i].x, global.factions[i].y, global.factions[i].z);
  },
  "gotojob": (player, _, i) => {
    if (!isAdmin(player, 1)) return global.noti(player, 4, global.msg.adminRequire);
    if (!i) return global.noti(player, 3, "Cú pháp: /gotojob [job id]");
    i -= 1;
    if (!global.jobs[i]) return global.noti(player, 3, "Job id không hợp lệ");
    player.position = new mp.Vector3(global.jobs[i].x, global.jobs[i].y, global.jobs[i].z);
  },
  "respawn": (player, _, id) => {
    if (!isAdmin(player, 1)) return global.noti(player, 4, global.msg.adminRequire);
    const target = global.getPlayerID(id);
    if (!target) return global.noti(player, 3, "Người chơi không hợp lệ!");
    spawnPlayer(target);
    global.noti(player, 1, `Bạn đã hồi sinh ${target.info.name}!`)
    global.noti(player, 1, `Admin ${player.info.name} đã hồi sinh bạn!`);
    sendAdmin(1, `${player.info.name} đã hồi sinh ${target.info.name}`)
  },

});
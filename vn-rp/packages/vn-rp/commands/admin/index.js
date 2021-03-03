const fs = require("fs");
const saveFile = "./packages/savedpos.txt";

mp.events.addCommand("save", (player) => {
  let pos = (player.vehicle) ? player.vehicle.position : player.position;
  let rot = (player.vehicle) ? player.vehicle.rotation : player.heading;

  fs.appendFile(saveFile, `${pos.x}, ${pos.y}, ${pos.z} | ${(player.vehicle) ? `Rotation: ${rot.x}, ${rot.y}, ${rot.z}` : `Heading: ${rot}`} | ${(player.vehicle) ? "InCar" : "OnFoot"}\r\n`, (err) => {
    if (err) {
      player.notify(`~r~SavePos Error: ~w~${err.message}`);
    } else {
      player.notify(`~g~Position saved`);
    }
  });
});

mp.events.addCommand("gotoxyz", (player, position) => {
  position = position.split(" ");
  player.position = new mp.Vector3(+position[0], +position[1], +position[2]);
})
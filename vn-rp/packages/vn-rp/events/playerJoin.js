let spawnPoints = require("../configs/spawnPoints.json");

mp.events.add('playerJoin', (player) => {
  player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
  player.health = 100;
});
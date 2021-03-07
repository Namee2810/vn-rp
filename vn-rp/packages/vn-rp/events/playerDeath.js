const { spawnPlayer } = require("./features/player");

mp.events.add('playerDeath', (player) => {
  spawnPlayer(player)
});
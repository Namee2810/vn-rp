mp.events.add("playerReady", (player) => {
  player.dimension = player.id;
  console.log(player.id);
})
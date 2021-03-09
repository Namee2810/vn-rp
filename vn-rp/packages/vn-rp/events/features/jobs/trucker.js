const trucker = {
  postionWork: [-332.4539, -2778.9873, 5.1431],
}

trucker.marker = mp.markers.new(39, new mp.Vector3(trucker.postionWork[0], trucker.postionWork[1], trucker.postionWork[2]), 2, {
  color: [255, 154, 23, 255],
  visible: true,
  dimension: 0
});
trucker.colshape = mp.colshapes.newCircle(trucker.postionWork[0], trucker.postionWork[1], 1.5, 0);

mp.events.add({
  "playerEnterColshape": (player, shape) => {
    if (shape === trucker.colshape) {
      global.showPrompt(player, "Nhấn <span class='success'>E</span> để làm việc");
      player.setVariable("enterJobWork", 1);
    }
  },
  "playerExitColshape": (player, shape) => {
    if (shape === trucker.colshape) {
      global.showPrompt(player, 0);
      player.setVariable("enterJobWork", 0);
    }
  }
})
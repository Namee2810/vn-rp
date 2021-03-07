mp.events.add({
  "add_voice_listener": (player, target) => {
    if (target) {
      player.enableVoiceTo(target);
    }
  },
  "remove_voice_listener": (player, target) => {
    if (target) {
      player.disableVoiceTo(target);
    }
  }
});
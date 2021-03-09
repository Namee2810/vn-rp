const rpc = require("rage-rpc");
const { setPlayerData } = require("../player");

require("./trucker");

mp.events.add({
  "playerEnterColshape": (player, shape) => {
    for (let i = 0; i < global.jobs.length; i++) {
      if (global.jobs[i].shape === shape) {
        player.setVariable("enterJob", i + 1);
        global.showPrompt(player, "Nhấn <span class='success'>Y</span> để nhận công việc\
        , nhấn <span class='danger'>N</span> để nghỉ việc")
        break
      }
    }
  },
  "playerExitColshape": (player, shape) => {
    for (let i = 0; i < global.jobs.length; i++) {
      if (global.jobs[i].shape === shape) {
        player.setVariable("enterJob", 0);
        global.showPrompt(player, 0)
        break
      }
    }
  }
})
rpc.register("getJob", (job, player) => {
  player = player.player;
  if (job > 0) {
    if (!player.info.job) {
      global.noti(player, 1, `Chúc mừng, bạn đã nhận được công việc ${global.jobs[job - 1].name}`);
      setPlayerData(player, "job", job);
    }
    else {
      if (job === player.info.job) global.noti(player, 3, "Bạn đã nhận công việc này!");
      else global.noti(player, 3, `Hãy tới công việc ${global.jobs[player.info.job - 1].name} để xin nghỉ việc!`);
    }
  }
  else {
    if (!player.info.job) global.noti(player, 3, "Bạn chưa nhận công việc nào!");
    else {
      if (player.getVariable("enterJob") !== player.info.job) global.noti(player, 3, `Hãy tới công việc ${global.jobs[player.info.job - 1].name} để xin nghỉ việc!`);
      else {
        global.noti(player, 1, `Bạn đã xin nghiệc công việc ${global.jobs[player.getVariable("enterJob") - 1].name}!`);
        setPlayerData(player, "job", 0);
      }
    }
  }
})
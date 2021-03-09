const updatePlayerList = require("./events/features/playerList");
const loadBlips = require("./modules/loadBlips");
const loadFactions = require("./modules/loadFactions");
const loadJobs = require("./modules/loadJobs");

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

require("./commands");
require("./events");
require("./modules/db");
require("./modules/global");
require("./events");
require("./commands");

function serverInit() {
  mp.events.delayInitialization = true;

  console.log("Server loading resources ...");
  //sync time
  const setWorldTime = () => {
    const now = new Date();
    mp.world.time.set(now.getHours(), now.getMinutes(), now.getSeconds());
  }
  setWorldTime()
  setInterval(() => {
    setWorldTime();
  }, 60000);

  //player online
  updatePlayerList();
  loadBlips();
  loadFactions();
  loadJobs();
}
serverInit();

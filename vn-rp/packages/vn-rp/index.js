require("./commands");
require("./events");
require("./modules/db");
require("./events");
require("./commands");
require("./functions");

mp.events.delayInitialization = true;

function serverInit() {
  //sync time
  const setWorldTime = () => {
    const now = new Date();
    mp.world.time.set(now.getHours(), now.getMinutes(), now.getSeconds());
  }
  setWorldTime()
  setInterval(() => {
    setWorldTime();
  }, 60000);

  mp.events.delayInitialization = true;
}

serverInit();
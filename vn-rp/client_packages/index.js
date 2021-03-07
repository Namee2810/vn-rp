function clientInit() {
  mp.events.delayInitialization = true;

  require("vn-rp");
  require("./rage-rpc.min");
  require("./animator");

  if (mp.game.ui.isPauseMenuActive()) {
    mp.game.ui.setFrontendActive(false);
  }
  //bind ALT
  mp.keys.bind(0x12, true, () => {
    if (global.useCEF) return;
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
  })
  mp.game.vehicle.defaultEngineBehaviour = false;
  global.useCEF = false;
}
clientInit();

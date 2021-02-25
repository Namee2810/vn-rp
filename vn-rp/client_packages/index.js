require("vn-rp");
require("./rage-rpc.min.js");

//bind
mp.keys.bind(0x12, true, () => {
  mp.gui.cursor.visible = !mp.gui.cursor.visible;
})

if (mp.game.ui.isPauseMenuActive()) {
  mp.game.ui.setFrontendActive(false);
}
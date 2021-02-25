let authCEF, cam;
const rpc = require("./rage-rpc.min.js");

// show/hide brower
mp.events.add("client:auth.show", () => {
  mp.gui.cursor.show(true, true);
  mp.gui.chat.activate(false);
  //mp.gui.chat.show(false);
  mp.game.ui.setMinimapVisible(true);
  mp.game.ui.displayRadar(false);

  global.auth = true;
  authCEF = mp.browsers.new("package://vn-rp/CEF/index.html#/auth");

  mp.events.call("client:auth.enableCamera");
});
mp.events.add("client:auth.destroy", () => {
  mp.gui.cursor.show(false, false);
  mp.gui.chat.activate(true);
  mp.gui.chat.show(true);
  mp.game.ui.setMinimapVisible(false);
  mp.game.ui.displayRadar(true);

  global.auth = false;
  authCEF.destroy();

  mp.events.call("client:auth.disableCamera");
})


//login
mp.events.add("client:auth.login", (email, password) => {

});


//register
mp.events.add("client:auth.register", (email, password) => {
  mp.events.callRemote("server:auth.register", email, password);
});
rpc.register("client:auth.registerHandle", (code) => {
  // code: 1 = success, 2 = email exist, 3 = error
  switch (code) {
    case 1: {
      break
    }
    case 2: {
      break
    }
    case 3: {
      break
    }
    default: break
  }
});

mp.events.add("client:auth.registerVerify", (email, code) => {

});


//forgot
mp.events.add("client:auth.forgot", (email) => {

});
mp.events.add("client:auth.forgotVerify", (email, code) => {

});


//camera
mp.events.add('client:auth.enableCamera', () => {
  cam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
  mp.players.local.position = new mp.Vector3(-1757.12, -739.53, 10);

  cam.setActive(true);
  cam.setCoord(-1757.12, -739.53, 25);
  cam.pointAtCoord(-1764, -715, 35);
  mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('client:auth.disableCamera', () => {
  cam.destroy();
  mp.game.cam.renderScriptCams(false, false, 0, false, false);
});
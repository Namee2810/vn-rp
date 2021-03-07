const rpc = require("./rage-rpc.min.js");
let usePhone = false;

mp.keys.bind(0x5A, true, () => {
  if (mp.gui.cursor.visible) return;
  rpc.callBrowsers("cef:show", "playerlist");
})
mp.keys.bind(0x5A, false, () => {
  if (mp.gui.cursor.visible) return;
  rpc.callBrowsers("cef:show", "playerlist");
})
mp.keys.bind(0x26, true, () => {
  if (mp.gui.cursor.visible && !usePhone) return;
  if (!usePhone) {
    global.useCEF = true
    rpc.callBrowsers("cef:url", "/phone");
    mp.gui.cursor.visible = true;
  }
  else {
    global.useCEF = false;
    rpc.callBrowsers("cef:url", "/");
    mp.gui.cursor.visible = false;
  }
  usePhone = !usePhone;
})

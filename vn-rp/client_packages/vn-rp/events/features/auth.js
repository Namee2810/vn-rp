const rpc = require("./rage-rpc.min.js");
let authCEF;

// show/hide brower
rpc.register("client:auth.show", () => {
  setTimeout(() => {
    global.cef("/auth")
  }, 1000);
  rpc.call("camera.enable");
  rpc.call("camera.set", {
    coord: [722.94, 1498.46, 479.29],
    point: [636.72, 823.06, 357.82],
  });
});
rpc.register("client:auth.destroy", () => {
  rpc.call("client:characters.show");
})
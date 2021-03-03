const rpc = require("./rage-rpc.min.js");
let authCEF;

// show/hide brower
rpc.register("client:auth.show", () => {
  authCEF = mp.browsers.new("package://vn-rp/CEF/index.html#/auth");
  rpc.call("client:camera.enable");
  rpc.call("client:camera.set", {
    coord: [722.94, 1498.46, 479.29],
    point: [636.72, 823.06, 357.82],
  });
});
rpc.register("client:auth.destroy", () => {
  authCEF.destroy();
  rpc.call("client:characters.show");
})
const rpc = require("./rage-rpc.min.js")

global.noti = (type, message) => {
  //1 = success, 2 = info, 3 = warning, 4 = error
  if (type === 1) type = "success";
  else if (type === 2) type = "info";
  else if (type === 3) type = "warning";
  else if (type === 4) type = "error";
  rpc.callBrowsers("cef:showNoti", { type, message });
}
global.HUD = (type, value) => {
  rpc.callBrowsers("cef:HUD", { type, value })
}
global.cef = url => {
  rpc.callBrowsers("cef:url", url)
}
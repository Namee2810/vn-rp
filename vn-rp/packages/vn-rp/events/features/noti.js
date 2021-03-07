const rpc = require("rage-rpc");

global.noti = (player, type, message) => {
  //1 = success, 2 = info, 3 = warning, 4 = error
  if (type === 1) type = "success";
  else if (type === 2) type = "info";
  else if (type === 3) type = "warning";
  else if (type === 4) type = "error";
  rpc.callBrowsers(player, "cef:showNoti", { type, message });
}
global.msg = {
  adminRequire: "Bạn không có quyền sử dụng lệnh này!"
}
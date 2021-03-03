const rpc = require("./rage-rpc.min.js");
let charactersCEF;
const player = mp.players.local;

rpc.register("client:characters.show", () => {
  if (charactersCEF) charactersCEF.active = true;
  else charactersCEF = mp.browsers.new("package://vn-rp/CEF/index.html#/characters");
})

rpc.register("client:characters.destroy", () => {
  charactersCEF.destroy()
})

rpc.register("client:characters.customize", (slot) => {
  rpc.call("client:camera.set", {
    coord: [402.875, -999.367, -99],
    point: [402.875, -996.474, -99],
  });
  rpc.callServer("server:characters.customize");

  player.setComponentVariation(3, 15, 0, 2);
  player.setComponentVariation(8, 15, 0, 2);
})
rpc.register("client:characters.customizeFinish", () => {
  rpc.call("client:camera.set", {
    coord: [722.94, 1498.46, 479.29],
    point: [636.72, 823.06, 357.82],
  });
});

rpc.register("client:characters.customizeHandle", (data) => {
  const { type, value } = data;
  switch (type) {
    case "view": {
      const { view, gender } = value;
      if (view === 1) rpc.call("client:camera.set", {
        coord: gender ? [402.875, -997.5, -98.34] : [402.875, -997.5, -98.25],//coord: [402.778, -999.367, -99.004],
        point: gender ? [402.875, -996.5, -98.34] : [402.875, -997, -98.25],//point: [402.875, -996.474, -99],
      });
      else rpc.call("client:camera.set", {
        coord: [402.875, -999.367, -99],
        point: [402.875, -996.474, -99],
      });
      break
    }
    case "gender": {
      player.model = value ? mp.game.joaat("mp_m_freemode_01") : mp.game.joaat("mp_f_freemode_01");
      break
    }
    case "parents": {
      const { mother, father, ratioGen } = value;
      player.setHeadBlendData(mother, father, 0, mother, father, 0, ratioGen, ratioGen, 0, false);
      break
    }
    case "hairStyle": {
      player.setComponentVariation(2, value, 0, 2);
      break
    }
    case "hairColor": {
      const { color1, color2 } = value;
      player.setHairColor(color1, color2);
      break
    }
    case "top": {
      player.setComponentVariation(11, value, 0, 2);
      break
    }
    case "undershirt": {
      player.setComponentVariation(8, value, 0, 2);
      break
    }
    case "leg": {
      player.setComponentVariation(4, value, 0, 2);
      break
    }
    case "shoe": {
      player.setComponentVariation(6, value, 0, 2);
      break
    }
    case "blemish": {
      player.setHeadOverlay(0, value, 1, 0, 0);
      break
    }
    case "beard": {
      player.setHeadOverlay(1, value, 1, 0, 0);
      break
    }
    case "eyebrow": {
      player.setHeadOverlay(2, value, 1, 0, 0);
      break
    }
    case "ageing": {
      player.setHeadOverlay(3, value, 1, 0, 0);
      break
    }
    case "makeup": {
      player.setHeadOverlay(4, value, 1, 0, 0);
      break
    }
    case "blush": {
      player.setHeadOverlay(5, value, 1, 0, 0);
      break
    }
    case "complexion": {
      player.setHeadOverlay(6, value, 1, 0, 0);
      break
    }
    case "sun": {
      player.setHeadOverlay(7, value, 1, 0, 0);
      break
    }
    case "lip": {
      player.setHeadOverlay(8, value, 1, 0, 0);
      break
    }
    case "freckle": {
      player.setHeadOverlay(9, value, 1, 0, 0);
      break
    }
    default: break;
  }
})
const generateKey = (length, string = true) => {
  var ret = "";
  if (string)
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
  else {
    while (ret.length < length) {
      ret += "" + Math.round(Math.random() * 10);
    }
  }
  return ret.substring(0, length);
};

module.exports = generateKey;
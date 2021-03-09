const formatNumber = (number) => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
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

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports = { formatNumber, generateKey, getRandomInt };
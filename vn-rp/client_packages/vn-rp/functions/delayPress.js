global.delayPress = false;
global.setDelayPress = () => {
  global.delayPress = true;
  setTimeout(() => {
    global.delayPress = false;
  }, 500);
}
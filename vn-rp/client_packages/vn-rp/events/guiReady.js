mp.events.add('guiReady', () => {
  mp.events.call("client:auth.show");
});
mp.events.add('setDiscordStatus', (serverName, status) => {
  mp.discord.update(serverName, status)
});
mp.events.call("setDiscordStatus", "Đang chơi VN-RP.COM", "Đang build server");
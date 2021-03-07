global.factions = []
async function loadFactions() {
  const factions = await mp.query("SELECT * FROM factions")
    .catch(err => console.log(err));
  global.factions = factions;
  factions.forEach(f => {
    mp.blips.new(f.blip, new mp.Vector3(f.x, f.y, f.z), {
      name: f.name,
      color: f.blipColor,
      shortRange: true
    })
  });
  console.log(`Factions: ${factions.length} loaded`);
}
module.exports = loadFactions;
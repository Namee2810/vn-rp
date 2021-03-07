async function loadBlips() {
  const blips = await mp.query("SELECT * FROM blips")
    .catch(err => console.log(err));
  blips.forEach(b => {
    mp.blips.new(b.blip, new mp.Vector3(b.x, b.y, 0), {
      name: b.name,
      color: b.color,
      shortRange: true
    })
  });
  console.log(`Blips: ${blips.length} loaded`);
}
module.exports = loadBlips;
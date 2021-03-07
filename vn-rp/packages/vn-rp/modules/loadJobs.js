global.jobs = []
async function loadJobs() {
  const jobs = await mp.query("SELECT * FROM jobs")
    .catch(err => console.log(err));
  global.jobs = jobs;
  jobs.forEach(j => {
    //Blip
    mp.blips.new(j.blip, new mp.Vector3(j.x, j.y, j.z), {
      name: j.name,
      color: j.blipColor,
      shortRange: true
    })
    //Marker
    j.color = j.color.split(",").map(i => +i);
    mp.markers.new(1, new mp.Vector3(j.x, j.y, j.z - 1), 2, {
      color: [j.color[0], j.color[1], j.color[2], 255],
      visible: true,
      dimension: 0
    });
    //Label
    const jobLabel = `ID ~g~${j.id}~w~\nCong viec ~g~${j.name}~w~\nNhan ~g~Y~w~ de nhan cong viec\nNhan ~r~N~w~ de nghi viec`
    mp.labels.new(jobLabel, new mp.Vector3(j.x, j.y, j.z + 0.2), {
      los: true,
      font: 0,
      drawDistance: 50,
      dimension: 0
    });
  });
  console.log(`Jobs: ${jobs.length} loaded`);
}
module.exports = loadJobs;
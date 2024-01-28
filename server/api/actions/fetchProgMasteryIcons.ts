import fs from "fs";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  if(body.user.id !== config.action_id) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  const url = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mastery-";
  for(let level = 1; level <= 7; level++) {
    const response = await fetch(url + level + '.png');
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    fs.createWriteStream(`./public/data/cdragon/progMastery/${level}.png`).write(Buffer.from(buffer));
  }

  console.log("Fetch Mastery Progress Icons");
  return true;
});
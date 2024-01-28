import fs from "fs";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  if(body.user.id !== config.action_id) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  const url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/";
  const csdResult = fs.readFileSync('./assets/data/cdragon/champion-summary.json', 'utf8');
  const championSummaryData = JSON.parse(csdResult);
  championSummaryData.forEach(async (champ: ChampionInfo) => {
    const response = await fetch(url + champ.id + ".png");
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    fs.createWriteStream(`./public/data/cdragon/champIcons/${champ.id}.png`).write(Buffer.from(buffer));
  });
  
  console.log("Fetch Champion Icons");
  return true;
});
import fs from "fs";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  if(body.user.id !== config.action_id) throw createError({ statusCode: 403, statusMessage: 'Forbidden' });

  const result = await cDragonRequest("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json");
  if(!result) throw createError({ statusCode: 409, statusMessage: 'Error communicating with CDragon' });
  fs.writeFileSync('./assets/data/cdragon/champion-summary.json', JSON.stringify(result));
  
  console.log("Fetch Champion Summaries");
  return true;
});

async function cDragonRequest(url: string) {
  let result;
  try {
    const response = await fetch(url);
    result = await response.json();
    //TODO: error checking

  } catch(error: any) {
    console.log(error);
  }

  return result;
}
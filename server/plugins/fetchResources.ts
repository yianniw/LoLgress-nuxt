// https://github.com/jurassicjs/nuxt-scheduler

import { useScheduler } from "#scheduler";
import fs from "fs";

const PLATFORMROUTINGVALUE = 'na1';
const runtimeConfig = useRuntimeConfig();

export default defineNitroPlugin(() => {
  // make required folders
  if(!fs.existsSync('./assets/data')) fs.mkdirSync('./assets/data');
  if(!fs.existsSync('./assets/data/cdragon')) fs.mkdirSync('./assets/data/cdragon');
  if(!fs.existsSync('./assets/data/challenges')) fs.mkdirSync('./assets/data/challenges');
  if(!fs.existsSync('./public/data')) fs.mkdirSync('./public/data');
  if(!fs.existsSync('./public/data/cdragon')) fs.mkdirSync('./public/data/cdragon');
  if(!fs.existsSync('./public/data/cdragon/champIcons')) fs.mkdirSync('./public/data/cdragon/champIcons');
  if(!fs.existsSync('./public/data/cdragon/progMastery')) fs.mkdirSync('./public/data/cdragon/progMastery');

  startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run(async () => {
    // await fetchChallengesConfig();
    await fetchChampionSummaries();
    await fetchChampionIcons();
    await fetchProgMasteryIcons();
  }).everySixHours();
}

async function fetchChallengesConfig() {
  const url = `https://${PLATFORMROUTINGVALUE}.api.riotgames.com/lol/challenges/v1/challenges/config`;
  const result = await riotApiRequest(url);
  if(!result)
    return;

  // filter out all locales besides "en_US"
  result.forEach((item: any) => {
    const localizedNames = item["localizedNames"];
    Object.entries(localizedNames).forEach((locale: any) => {
      if(locale[0] === "en_US") {
        item["localizedNames"] = {
          "en_US": {
            "description": locale[1]["description"],
            "name": locale[1]["name"],
            "shortDescription": locale[1]["shortDescription"]
          }
        };
        return;
      }
    });
  });

  fs.writeFileSync('./assets/data/challenges/config.json', JSON.stringify(result));
  console.log("Fetch Challenges Config");
}

async function fetchChampionSummaries() {
  const url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
  const result = await cDragonRequest(url);
  if(!result)
    return;

  fs.writeFileSync('./assets/data/cdragon/champion-summary.json', JSON.stringify(result));
  console.log("Fetch Champion Summaries");
}

async function fetchChampionIcons() {
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
}

async function fetchProgMasteryIcons() {
  const url = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mastery-";
  for(let level = 1; level <= 7; level++) {
    const response = await fetch(url + level + '.png');
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    fs.createWriteStream(`./public/data/cdragon/progMastery/${level}.png`).write(Buffer.from(buffer));
    console.log(`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-postgame/global/default/mastery-${level}.png`);
  }
  console.log("Fetch Mastery Progress Icons");
}

async function fetchChallengeTokens() {
  // "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/challenges/config/"
  // "https://raw.communitydragon.org/latest/game/assets/challenges/config/"
}

async function riotApiRequest(url: string) {
  let result;
  try {
    const response = await fetch(url, {
      headers: { 'X-Riot-Token': runtimeConfig.x_riot_token }
    });
    result = await response.json();

    if(result?.status?.status_code >= 400) {
      throw createError({
        statusCode: result.status.status_code,
        statusMessage: result.status.message,
      });
    }
  } catch(error: any) {
    throw createError({
      statusCode: error.status_code,
      statusMessage: error.message,
    });
  }

  return result;
}

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
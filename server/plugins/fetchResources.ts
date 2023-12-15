// https://github.com/jurassicjs/nuxt-scheduler

import { useScheduler } from "#scheduler";
import fs from "fs";

const PLATFORMROUTINGVALUE = 'na1';
const runtimeConfig = useRuntimeConfig()
// import { fetchChallengesConfig } from "~/fetch";

export default defineNitroPlugin(() => {
  startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  // scheduler.run(() => {
  //   fetchChallengesConfig();
  // }).everySeconds(10);
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
          en_US: {
            description: locale[1]["description"],
            name: locale[1]["name"],
            shortDescription: locale[1]["shortDescription"]
          }
        };
        return;
      }
    });
  });

  fs.writeFileSync('./assets/data/challenges/config.json', JSON.stringify(result));
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
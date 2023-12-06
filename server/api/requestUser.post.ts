/**
 * As of writing, it is still required to ask users for their region ID.
 * https://developer.riotgames.com/docs/summoner-name-to-riot-id-faq
 */
const REGIONALROUTINGVALUE = 'americas'
const PLATFORMROUTINGVALUE = 'na1'

let config: any;

export default defineEventHandler(async (event) => {
  config = useRuntimeConfig(event);
  const body = await readBody(event);

  if(isBlank(body.GameName) || isBlank(body.TagLine)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input'
    });
  }

  // TODO:
  // let user = await hasTimeout(body.GameName, body.TagLine);


  const user = await requestUserPuuid(body.GameName, body.TagLine);
  const info = await requestUserInfo(user.puuid);
  //TODO: if account is too fresh, champion will not be defined
  const champion = await requestChampionMasteryData(user.puuid);

  user.info = info;
  user.champion = champion;
  user.lastUpdate = Date.now();
  
  return { user }
});

const isBlank = (str : string) => (!str || /^\s*$/.test(str));

async function hasTimeout(gameName: string, tagLine: string) {
  //TODO:
}

async function requestUserPuuid(gameName: string, tagLine: string) {
  return await riotApiRequest(
    `https://${REGIONALROUTINGVALUE}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
  );
}

async function requestUserInfo(puuid: string) {
  return await riotApiRequest(
    `https://${PLATFORMROUTINGVALUE}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
  );
}

async function requestChampionMasteryData(puuid: string) {
  return await riotApiRequest(
    `https://${PLATFORMROUTINGVALUE}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`
  );
}

async function riotApiRequest(url: string) {
  let result;
  try {
    const response = await fetch(url, {
      headers: { 'X-Riot-Token': config.x_riot_token }
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
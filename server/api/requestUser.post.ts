/**
 * As of writing, it is still required to ask users for their region ID.
 * https://developer.riotgames.com/docs/summoner-name-to-riot-id-faq
 */
const REGIONALROUTINGVALUE = 'americas'
const PLATFORMROUTINGVALUE = 'na1'

let config: any;

import { serverSupabaseClient } from "#supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  config = useRuntimeConfig(event);
  const body = await readBody(event);

  if(isBlank(body.GameName) || isBlank(body.TagLine)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input'
    });
  }

  const supabase = await serverSupabaseClient(event);
  let user = await retrieveUserFromDb(supabase, body.GameName, body.TagLine);
  if(user !== null) return user;

  user = await requestUserPuuid(body.GameName, body.TagLine);
  const info = await requestUserInfo(user.puuid);
  const champion = await requestChampionMasteryData(user.puuid);

  user.info = info;
  user.champion = champion;
  user.lastUpdate = Date.now();
  await addUserToDb(supabase, user);
  
  return user;
});
                      
async function retrieveUserFromDb(supabase: SupabaseClient, gameName: string, tagLine: string) {
  const userData = await supabase
    .from('users')
    .select('*')
    .ilike('game_name', gameName)
    .ilike('tag_line', tagLine)
    .maybeSingle()

  if(userData.data === null) return null;

  function hasTimeout(mins: number) {
    const lastUpdate = new Date(Date.parse(userData.data.last_update));
    const nextUpdate = new Date(lastUpdate.getTime() + (mins * 60000));

    return new Date(Date.now()) < nextUpdate;
  }

  if(!hasTimeout(10)) {
    console.log(`Update user: ${gameName}#${tagLine}`);
    return null;
  }
  console.log(`Retrieve user: ${gameName}#${tagLine}`);
    
  const userInfo = await supabase
    .from('user_info')
    .select('*')
    .eq('puuid', userData.data.puuid)
    .maybeSingle()

  const champions = await supabase
    .from('champions')
    .select('*')
    .eq('puuid', userData.data.puuid)

  const newChamps: Champion[] = [];
  // @ts-ignore: Object is possibly 'null'.
  champions.data.forEach((champ: DbChampion) => {
    newChamps.push(<Champion>{
      championId: champ.champion_id,
      championLevel: champ.champion_level,
      championPoints: champ.champion_points,
      championPointsSinceLastLevel: champ.champion_points_since_last_level,
      championPointsUntilNextLevel: champ.champion_points_until_next_level,
      chestGranted: champ.chest_granted,
      lastPlayTime: champ.last_play_time,
      puuid: champ.puuid,
      summonerId: champ.summoner_id,
      tokensEarned: champ.tokens_earned,
      uuid: `${champ.champion_id}_${champ.puuid}`,
    });
  });

  const info = <UserInfo>{
    accountId: userInfo.data.account_id,
    id: userInfo.data.id,
    name: userInfo.data.name,
    profileIconId: userInfo.data.profile_icon_id,
    puuid: userInfo.data.puuid,
    revisionDate: userInfo.data.revision_date,
    summonerLevel: userInfo.data.summoner_level
  }

  const user = {
    champion: [...newChamps],
    createdAt: Date.parse(userData.data.created_at),
    gameName: userData.data.game_name,
    info: info,
    lastUpdate: Date.parse(userData.data.last_update),
    puuid: userData.data.puuid,
    tagLine: userData.data.tag_line
  }

  return user;
}

async function addUserToDb(supabase: SupabaseClient, user: any) {
  const userData = await supabase.from('users')
    .upsert({
      game_name: user.gameName,
      last_update: new Date().toISOString(),
      puuid: user.puuid,
      tag_line: user.tagLine
    }, { onConflict: 'puuid' })

  const userInfo = await supabase.from('user_info')
    .upsert({
      account_id: user.info.accountId,
      id: user.info.id,
      name: user.info.name,
      profile_icon_id: user.info.profileIconId,
      puuid: user.info.puuid,
      revision_date: user.info.revisionDate,
      summoner_level: user.info.summonerLevel
    }, { onConflict: 'puuid' })

  const newChamps: DbChampion[] = [];
  user.champion.forEach((champ: Champion) => {
    newChamps.push(<DbChampion>{
      champion_id: champ.championId,
      champion_level: champ.championLevel,
      champion_points: champ.championPoints,
      champion_points_since_last_level: champ.championPointsSinceLastLevel,
      champion_points_until_next_level: champ.championPointsUntilNextLevel,
      chest_granted: champ.chestGranted,
      last_play_time: champ.lastPlayTime,
      puuid: champ.puuid,
      summoner_id: champ.summonerId,
      tokens_earned: champ.tokensEarned,
      uuid: `${champ.championId}_${champ.puuid}`
    });
  });

  const champs = await supabase.from('champions')
    .upsert(
      [...newChamps],
      { onConflict: 'uuid' }
    )
}

const isBlank = (str: string) => (!str || /^\s*$/.test(str));

async function requestUserPuuid(gameName: string, tagLine: string): Promise<User> {
  return await riotApiRequest(
    `https://${REGIONALROUTINGVALUE}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
  );
}

async function requestUserInfo(puuid: string): Promise<UserInfo> {
  return await riotApiRequest(
    `https://${PLATFORMROUTINGVALUE}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
  );
}

//TODO: if account is too fresh, champion will not be defined
async function requestChampionMasteryData(puuid: string): Promise<Champion[]> {
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
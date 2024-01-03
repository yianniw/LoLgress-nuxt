export { Champion };

declare global {
  interface Champion {
    championId: number,
    championInfo: ChampionInfo,
    championLevel: number,
    championPoints: number,
    championPointsSinceLastLevel: number,
    championPointsUntilNextLevel: number,
    chestGranted: boolean,
    lastPlayTime: number,
    puuid: string,
    summonerId: string,
    tokensEarned: number,
    uuid: string
  }

  interface DbChampion {
    champion_id: number,
    champion_info: ChampionInfo,
    champion_level: number,
    champion_points: number,
    champion_points_since_last_level: number,
    champion_points_until_next_level: number,
    chest_granted: boolean,
    last_play_time: number,
    puuid: string,
    summoner_id: string,
    tokens_earned: number,
    uuid: string
  }

  interface ChampionInfo {
    alias: string,
    id: number,
    name: string,
    roles: Array<string>,
    squarePortraitPath: string
  }
}
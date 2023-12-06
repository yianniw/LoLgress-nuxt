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
    tokensEarned: number
  }

  interface ChampionInfo {
    alias: string,
    id: number,
    name: string,
    roles: Array<string>,
    squarePortraitPath: string
  }
}
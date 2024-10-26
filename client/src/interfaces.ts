export interface Input {
  textBox: string | null;
  topPath: number | null;
  middlePath: number | null;
  bottomPath: number | null;
}

export interface Tower {
  Name: string;
  Image: string;
  Cost: number[];
  Damage: number | string | null;
  Pierce: number | string | null;
  "Attack Speed": number | string | null;
  Range: number | string;
  "Camo Detection": boolean | string;
  Footprint: string;
  "Damage Type": string;
  "Base Tower"?: string;
  Crosspath?: string;
  "Top Path"?: number;
  "Middle Path"?: number;
  "Bottom Path"?: number;
}

export interface Crosspaths {
  [upgradePath: string]: Tower;
}

export interface Towers {
  [baseTower: string]: Crosspaths;
}

export interface DailyTower {
  date: string;
  numSolved: number;
  tower: Tower;
}

export interface Challenge {
  date: string;
  baseTower: string;
  crosspath: string;
  numSolved: number;
}

export interface ChallengeResponse {
  message: string;
  challenge: Challenge;
}

export interface UpdateResponse {
  "num-solved": number;
  message: string;
}

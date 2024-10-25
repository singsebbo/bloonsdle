import { Tower, Towers } from "./interfaces";

const images = import.meta.glob("./assets/towerImages/*.png");

export function getTower(
  baseTower: string,
  crosspath: string,
  allTowers: Towers
): Tower {
  const tower: Tower = allTowers[baseTower][crosspath];
  tower["Base Tower"] = baseTower;
  tower.Crosspath = crosspath;
  tower["Top Path"] = Number(crosspath.split("-")[0]);
  tower["Middle Path"] = Number(crosspath.split("-")[1]);
  tower["Bottom Path"] = Number(crosspath.split("-")[2]);
  return tower;
}

export async function loadTowerImages(): Promise<{ [key: string]: string }> {
  const loadedImages: { [key: string]: string } = {};
  for (let path in images) {
    const imageModule: { default: string } = (await images[path]()) as {
      default: string;
    };
    path = path.split("/")[3];
    loadedImages[path] = imageModule.default;
  }
  return loadedImages;
}

// Returns a number, 0 is strictly less than, 1 is strictly greater than, 2 is contained, 3 is the same
export function compareStats(
  guessStat: number | string | null,
  answerStat: number | string | null
): number {
  if (guessStat === null && answerStat === null) {
    return 3;
  } else if (guessStat === null) {
    return 0;
  } else if (answerStat === null) {
    return 1;
  }
  let minGuessStat: number;
  let maxGuessStat: number;
  if (typeof guessStat === "string") {
    minGuessStat = Number(guessStat.split("-")[0]);
    maxGuessStat = Number(guessStat.split("-")[1]);
  } else {
    minGuessStat = guessStat;
    maxGuessStat = guessStat;
  }
  let minAnswerStat: number;
  let maxAnswerStat: number;
  if (typeof answerStat === "string") {
    minAnswerStat = Number(answerStat.split("-")[0]);
    maxAnswerStat = Number(answerStat.split("-")[1]);
  } else {
    minAnswerStat = answerStat;
    maxAnswerStat = answerStat;
  }
  if (maxGuessStat < minAnswerStat) {
    return 0;
  } else if (minGuessStat > maxAnswerStat) {
    return 1;
  } else if (minGuessStat === minAnswerStat && maxGuessStat === maxAnswerStat) {
    return 3;
  } else {
    return 2;
  }
}

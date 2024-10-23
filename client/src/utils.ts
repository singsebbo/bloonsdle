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

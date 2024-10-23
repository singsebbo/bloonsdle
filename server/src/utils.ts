import fs from "fs";
import path from "path";

export function getAllTowerData(): any {
  const data: string = fs.readFileSync(
    path.join(__dirname, "towers.json"),
    "utf8"
  );
  return JSON.parse(data);
}

export function generateRandomTower(): {
  baseTower: string;
  crosspath: string;
} {
  const possibleSolutions: JSON = getAllTowerData();
  const baseTowers: string[] = Object.keys(possibleSolutions);
  const randomBaseTower: string =
    baseTowers[Math.floor(Math.random() * baseTowers.length)];
  const crosspaths: string[] = Object.keys(possibleSolutions[randomBaseTower]);
  const randomCrosspath: string =
    crosspaths[Math.floor(Math.random() * crosspaths.length)];
  const selectedTowerType: string = randomBaseTower;
  const selectedCrosspath: string = randomCrosspath;
  return {
    baseTower: selectedTowerType,
    crosspath: selectedCrosspath,
  };
}

export function formatDate(dateTime: string | Date): string {
  if (dateTime instanceof Date) {
    dateTime = dateTime.toISOString();
  }
  const splitDateTime: string[] = dateTime.split("T")[0].split("-");
  const year: string = splitDateTime[0];
  const month: string = splitDateTime[1];
  const day: string = splitDateTime[2];
  const date: string = `${year}-${month}-${day}`;
  return date;
}

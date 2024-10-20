import express, { Express } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import cron from "node-cron";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = 3000;
const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

function loadPossibleSolution(): any {
  const data = fs.readFileSync(path.join(__dirname, "towers.json"), "utf8");
  return JSON.parse(data);
}

function generateRandomSolution(): { towerType: string; crosspath: string } {
  const possibleSolutions: JSON = loadPossibleSolution();
  const towerTypes = Object.keys(possibleSolutions);
  const randomTowerType =
    towerTypes[Math.floor(Math.random() * towerTypes.length)];
  const crosspaths = Object.keys(possibleSolutions[randomTowerType]);
  const randomCrosspath =
    crosspaths[Math.floor(Math.random() * crosspaths.length)];
  const selectedTowerType = randomTowerType;
  const selectedCrosspath = randomCrosspath;
  return {
    towerType: selectedTowerType,
    crosspath: selectedCrosspath,
  };
}

async function createNextDailyChallenge(): Promise<void> {
  try {
    const challenge = generateRandomSolution();
    console.log(`Generated challenge: ${JSON.stringify(challenge)}`);
    await pool.query(
      `INSERT INTO solution (challenge_date, base_tower, crosspath) VALUES (CURRENT_DATE + INTERVAL '1 day', $1, $2)`,
      [challenge.towerType, challenge.crosspath]
    );
    console.log("Success");
  } catch (err: unknown) {
    console.error(err);
  }
}

cron.schedule(
  "0 0 * * *",
  (): void => {
    console.log("Running cron job for next days's challenge...");
    createNextDailyChallenge();
  },
  {
    timezone: "America/Los_Angeles",
  }
);

app.get("/daily", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM solution WHERE challenge_date = CURRENT_DATE`
    );
    if (result.rows.length === 0)
      res.status(200).send({ message: "Daily challenge does not exist" });
    const numSolved = result.rows[0].num_solved;
    const baseTower = result.rows[0].base_tower;
    const crosspath = result.rows[0].crosspath;
    res.status(200).send({
      tower: baseTower,
      path: crosspath,
      solved: numSolved,
    });
  } catch (err: unknown) {
    res.sendStatus(500);
  }
});

app.listen(port, (): void => {
  console.log(`App is listening on port ${port}`);
});

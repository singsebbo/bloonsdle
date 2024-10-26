import { QueryResult } from "pg";
import pool from "./database";
import { Challenge } from "./interfaces";
import { generateRandomTower, formatDate } from "./utils";

class DatabaseModel {
  static async getChallenge(): Promise<Challenge> {
    try {
      const query = `
        SELECT *
        FROM solution
        WHERE challenge_date = CURRENT_DATE
      `;
      const result: QueryResult<Challenge> = await pool.query(query);
      if (result.rows.length === 0) {
        throw new Error(`Challenge for today does not exist`);
      }
      const challenge: Challenge = {
        date: formatDate(result.rows[0].challenge_date),
        baseTower: result.rows[0].base_tower,
        crosspath: result.rows[0].crosspath,
        numSolved: result.rows[0].num_solved,
      };
      return challenge;
    } catch (err: unknown) {
      console.error(err);
      throw new Error("Error while getting challenge");
    }
  }

  static async createNextDailyChallenge(): Promise<void> {
    try {
      const challenge: { baseTower: string; crosspath: string } =
        generateRandomTower();
      const query = `
        INSERT INTO solution (challenge_date, base_tower, crosspath)
        VALUES (CURRENT_DATE + INTERVAL '1 day', $1, $2)
      `;
      const values: string[] = [challenge.baseTower, challenge.crosspath];
      await pool.query(query, values);
    } catch (err: unknown) {
      console.error(err);
      throw new Error("Error while creating next daily challenge");
    }
  }

  static async checkChallenge(
    currentDate: string,
    baseTower: string,
    crosspath: string
  ): Promise<number> {
    try {
      const query = `
        UPDATE solution
        SET num_solved = num_solved + 1
        WHERE challenge_date = CURRENT_DATE
          AND challenge_date = $1
          AND base_tower = $2
          AND crosspath = $3
        RETURNING num_solved
      `;
      const values: string[] = [currentDate, baseTower, crosspath];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("No challenge with those parameters found");
      }
      return result.rows[0].num_solved;
    } catch (err: unknown) {
      console.error(err);
      throw new Error("Error while checking daily challenge answer");
    }
  }
}

export default DatabaseModel;

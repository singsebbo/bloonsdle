import { Request, Response } from "express";
import DatabaseModel from "./model";
import { Challenge } from "./interfaces";

export async function getDailyChallenge(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const challenge: Challenge = await DatabaseModel.getChallenge();
    res.status(200).send({
      message: "Successfully retrieved daily challenge",
      challenge: challenge,
    });
  } catch (err: unknown) {
    console.error(err);
    res.status(400).send({
      message: "Error while retrieving daily challenge",
    });
  }
}

export async function updateNumSolved(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { date, baseTower, crosspath } = req.body;
    if (!date || !baseTower || !crosspath) {
      throw new Error("API request body missing fields");
    }
    const numSolved = await DatabaseModel.checkChallenge(
      date,
      baseTower,
      crosspath
    );
    res.status(200).send({
      "num-solved": numSolved,
      message: "Successfully solved the daily challenge",
    });
  } catch (err: unknown) {
    console.error(err);
    res.status(400).send({
      message: "Error while getting daily challenge solve count",
    });
  }
}

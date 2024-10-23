import cron from "node-cron";
import DatabaseModel from "./model";

async function createNextChallenge(): Promise<void> {
  console.log("Running cron job for tomorrow's challenge...");
  await DatabaseModel.createNextDailyChallenge();
}

cron.schedule("0 0 * * *", createNextChallenge, {
  timezone: "America/Los_Angeles",
});

console.log("Cron jobs have been scheduled");

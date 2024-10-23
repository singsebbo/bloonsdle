import { Router } from "express";
import { getDailyChallenge } from "./controller";

const router: Router = Router();

router.get("/daily", getDailyChallenge);

export default router;

import { Router } from "express";
import { getDailyChallenge, updateNumSolved } from "./controller";

const router: Router = Router();

router.get("/daily", getDailyChallenge);
router.patch("/updateSolved", updateNumSolved);

export default router;

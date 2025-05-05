import {Router} from "express";
import { userStatsHandler } from "../controllers/useStatsController";

const router = Router();

router.route("/stats")
    .get(userStatsHandler)



export default router;
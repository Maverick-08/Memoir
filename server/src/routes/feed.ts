import {Router} from "express";
import { getUserFeeds } from "../controllers/userFeeds";

const router = Router();

router.route("/")
    .get(getUserFeeds)


export default router;
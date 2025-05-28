import {Router} from "express";
import { userStatsHandler } from "../controllers/useStats";
import { userDetailsHandler } from "../controllers/userDetails";
import { doesUserExist } from "../controllers/userExists";

const router = Router();

router.route("/:userId")
    .get(doesUserExist)

router.route("/stats")
    .get(userStatsHandler)

router.route("/profile/:userId")
    .get(userDetailsHandler);

router.route("/workEx/:userId")
    .get()

router.route("/posts/:userId")
    .get()



export default router;
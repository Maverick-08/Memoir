import { Router } from "express";
import { logoutHandler } from "../controllers/userSignout";

const router = Router();

router.route("/").get(logoutHandler)

export default router
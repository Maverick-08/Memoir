import { Router } from "express";
import { userAuthenticationHandler } from "../controllers/userAuthentication";

const router = Router();

router.route("/").post(userAuthenticationHandler);

export default router;

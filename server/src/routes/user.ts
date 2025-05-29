import { Router } from "express";
import { userStatsHandler } from "../controllers/useStats";
import { userDetailsHandler } from "../controllers/userDetails";
import { doesUserExist } from "../controllers/userExists";
import { userProfileInfoHandler } from "../controllers/userProfile";
import { uploadProfileAndBackgroundImage } from "../config/multer-config";

const router = Router();

router.route("/:userId").get(doesUserExist);

router.route("/stats").get(userStatsHandler);

router.route("/profile/:userId")
  .get(userDetailsHandler)
  .post(
    uploadProfileAndBackgroundImage.fields([
      { name: "profileImage", maxCount: 1 },
      { name: "backgroundImage", maxCount: 1 },
    ]),
    userProfileInfoHandler
  );

router.route("/workEx/:userId").get();

router.route("/posts/:userId").get();

export default router;

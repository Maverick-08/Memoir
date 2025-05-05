import { Router } from "express";
import {uploadPostImage} from "../config/multer-config"
import { postCreationhandler } from "../controllers/postController";
import { postImpressionHandler } from "../controllers/postImpressionController";

const router = Router();

router.route("/")
    .post(uploadPostImage.array("images",10),postCreationhandler)

router.route("/impression")
    .get(postImpressionHandler)


export default router;
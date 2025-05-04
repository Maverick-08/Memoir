import { Router } from "express";
import {uploadPostImage} from "../config/multer-config"
import { handleImageUpload } from "../controllers/postController";

const router = Router();

router.route("/")
    .post(uploadPostImage.array("images",10),handleImageUpload)


export default router;
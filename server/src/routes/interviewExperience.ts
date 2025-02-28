import { Router } from "express";
import { getAllInterviewExperience, postInterviewExperience } from "../controllers/userInterviewExperience";

const router = Router();

router.route("/")
    .get(getAllInterviewExperience)
    .post(postInterviewExperience)

router.route("/personal")
    .get()    

    
export default router
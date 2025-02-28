import { Router } from "express";
import { getAllInterviewExperience, getUserInterviewExperience, postInterviewExperience } from "../controllers/userInterviewExperience";

const router = Router();

router.route("/")
    .get(getAllInterviewExperience)
    .post(postInterviewExperience)

router.route("/personal")
    .get(getUserInterviewExperience)    

    
export default router
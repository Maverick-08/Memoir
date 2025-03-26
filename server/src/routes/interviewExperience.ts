import { Router } from "express";
import { deleteInterviewExperience, deleteUserInterviewExperience, getAllInterviewExperience, getInterviewExperienceUpdateDetails, getUserInterviewExperience, postInterviewExperience, postUserInterviewExperience, updateInterviewExperience, updateUserPersonalInterviewExperience } from "../controllers/userInterviewExperience";

const router = Router();

router.route("/")
    .get(getAllInterviewExperience)
    .post(postInterviewExperience)
    .delete(deleteInterviewExperience)

router.route("/update")
    .get(getInterviewExperienceUpdateDetails)
    .post(updateInterviewExperience)

router.route("/personal")
    .get(getUserInterviewExperience)
    .post(postUserInterviewExperience)
    .delete(deleteUserInterviewExperience)
    
router.route("/personal/update")
    .post(updateUserPersonalInterviewExperience)

    
export default router
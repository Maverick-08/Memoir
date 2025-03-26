"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userInterviewExperience_1 = require("../controllers/userInterviewExperience");
const router = (0, express_1.Router)();
router.route("/")
    .get(userInterviewExperience_1.getAllInterviewExperience)
    .post(userInterviewExperience_1.postInterviewExperience);
router.route("/update")
    .get(userInterviewExperience_1.getInterviewExperienceUpdateDetails)
    .post(userInterviewExperience_1.updateInterviewExperience);
router.route("/personal")
    .get(userInterviewExperience_1.getUserInterviewExperience)
    .post(userInterviewExperience_1.postUserInterviewExperience)
    .delete(userInterviewExperience_1.deleteUserInterviewExperience);
router.route("/personal/update")
    .post(userInterviewExperience_1.updateUserPersonalInterviewExperience);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userInterviewExperience_1 = require("../controllers/userInterviewExperience");
const router = (0, express_1.Router)();
router.route("/")
    .get(userInterviewExperience_1.getAllInterviewExperience)
    .post(userInterviewExperience_1.postInterviewExperience);
router.route("/personal")
    .get();
exports.default = router;

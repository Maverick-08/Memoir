"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useStats_1 = require("../controllers/useStats");
const userDetails_1 = require("../controllers/userDetails");
const userExists_1 = require("../controllers/userExists");
const userProfile_1 = require("../controllers/userProfile");
const multer_config_1 = require("../config/multer-config");
const router = (0, express_1.Router)();
router.route("/:userId").get(userExists_1.doesUserExist);
router.route("/stats").get(useStats_1.userStatsHandler);
router.route("/profile/:userId")
    .get(userDetails_1.userDetailsHandler)
    .post(multer_config_1.uploadProfileAndBackgroundImage.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
]), userProfile_1.userProfileInfoHandler);
router.route("/workEx/:userId").get();
router.route("/posts/:userId").get();
exports.default = router;

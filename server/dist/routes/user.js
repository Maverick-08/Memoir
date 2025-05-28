"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const useStats_1 = require("../controllers/useStats");
const userDetails_1 = require("../controllers/userDetails");
const userExists_1 = require("../controllers/userExists");
const router = (0, express_1.Router)();
router.route("/:userId")
    .get(userExists_1.doesUserExist);
router.route("/stats")
    .get(useStats_1.userStatsHandler);
router.route("/profile/:userId")
    .get(userDetails_1.userDetailsHandler);
router.route("/workEx/:userId")
    .get();
router.route("/posts/:userId")
    .get();
exports.default = router;

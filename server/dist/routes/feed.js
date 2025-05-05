"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userFeeds_1 = require("../controllers/userFeeds");
const router = (0, express_1.Router)();
router.route("/")
    .get(userFeeds_1.getUserFeeds);
exports.default = router;

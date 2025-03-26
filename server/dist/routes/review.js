"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addReviews_1 = require("../controllers/addReviews");
const router = (0, express_1.Router)();
router.route("/")
    .post(addReviews_1.addReviews);
exports.default = router;

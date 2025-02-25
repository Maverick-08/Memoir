"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userSignout_1 = require("../controllers/userSignout");
const router = (0, express_1.Router)();
router.route("/").get(userSignout_1.logoutHandler);
exports.default = router;

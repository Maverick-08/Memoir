"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuthentication_1 = require("../controllers/userAuthentication");
const router = (0, express_1.Router)();
router.route("/").post(userAuthentication_1.userAuthenticationHandler);
exports.default = router;

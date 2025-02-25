"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegistration_1 = require("../controllers/userRegistration");
const router = (0, express_1.Router)();
router.route("/")
    .post(userRegistration_1.userRegistrationHandler);
exports.default = router;

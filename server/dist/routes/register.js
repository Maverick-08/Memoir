"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRegistration_1 = require("../controllers/userRegistration");
const otpController_1 = require("../controllers/otpController");
const router = (0, express_1.Router)();
router.route("/")
    .post(userRegistration_1.userRegistrationHandler);
router.route("/password")
    .post(userRegistration_1.createPassword);
router.route("/otp")
    .get(otpController_1.resendOTP)
    .post(otpController_1.verifyOtp);
exports.default = router;

import { Router } from 'express';
import { createPassword, userRegistrationHandler } from '../controllers/userRegistration';
import { verifyOtp,resendOTP } from '../controllers/otpController';

const router = Router();

router.route("/")
    .post(userRegistrationHandler)

router.route("/password")
    .post(createPassword)

router.route("/otp")
    .get(resendOTP)
    .post(verifyOtp)


export default router
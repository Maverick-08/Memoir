import { Router } from 'express';
import { createPassword, userRegistrationHandler } from '../controllers/userRegistration';
import { verifyOtp } from '../controllers/otpController';

const router = Router();

router.route("/")
    .post(userRegistrationHandler)

router.route("/password")
    .post(createPassword)

router.route("/otp")
    .post(verifyOtp)


export default router
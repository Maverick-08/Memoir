import { Router, Request, Response } from 'express';
import { userRegistrationHandler } from '../controllers/userRegistration';
import { OTPHandler } from '../controllers/otpController';

const router = Router();

router.route("/")
    .post(userRegistrationHandler)
    .get(OTPHandler)


export default router
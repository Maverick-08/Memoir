import { Router, Request, Response } from 'express';
import { userRegistrationHandler } from '../controllers/userRegistration';

const router = Router();

router.route("/")
    .post(userRegistrationHandler)

export default router
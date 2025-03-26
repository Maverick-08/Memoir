import { Router, Request, Response } from 'express';
import { addReviews } from '../controllers/addReviews';

const router = Router();

router.route("/")
    .post(addReviews)

export default router
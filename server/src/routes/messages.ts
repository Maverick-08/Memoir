import { Router } from "express";
import { searchUsernameHandler } from "../controllers/searchUsername";
import { createConversationHandler, messageHandler } from "../controllers/conversation";

const router = Router();

router.route("/conversation")
    .post(createConversationHandler) // Create conversation     
    .get(messageHandler) // Get messages based on a conversation id & page limit

router.route("/search")
    .get(searchUsernameHandler);

export default router;

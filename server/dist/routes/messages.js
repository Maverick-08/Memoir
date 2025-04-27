"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const searchUsername_1 = require("../controllers/searchUsername");
const conversation_1 = require("../controllers/conversation");
const router = (0, express_1.Router)();
router.route("/conversation")
    .post(conversation_1.createConversationHandler) // Create conversation     
    .get(conversation_1.messageHandler); // Get messages based on a conversation id & page limit
router.route("/search")
    .get(searchUsername_1.searchUsernameHandler);
exports.default = router;

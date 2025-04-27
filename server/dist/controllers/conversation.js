"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = exports.createConversationHandler = void 0;
const status_code_1 = require("../config/status-code");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a conversation Id of sender and receiver
const createConversationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const response = yield prisma.conversation.create({
            data: {
                userId_1: payload.userId_1,
                userId_2: payload.userId_2,
                pinned: payload.pinned
            }
        });
        res.status(status_code_1.StatusCode.ResourceCreated).json({ data: response });
        return;
    }
    catch (err) {
        console.log("Error : @createConversationHandler \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Internal Server Error" });
        return;
    }
});
exports.createConversationHandler = createConversationHandler;
// Extract messages from a conversation based on it's Id
const messageHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.query;
        const limit = 50;
        const response = yield prisma.message.findMany({
            skip: (payload.page - 1) * limit,
            take: limit,
            orderBy: {
                timestamp: 'desc'
            },
            where: {
                conversationId: payload.conversationId
            }
        });
        res.status(status_code_1.StatusCode.ResourceCreated).json({ data: response });
        return;
    }
    catch (err) {
        console.log("Error : @messageHandler \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Internal Server Error" });
        return;
    }
});
exports.messageHandler = messageHandler;

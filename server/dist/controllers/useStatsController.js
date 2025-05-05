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
exports.userStatsHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const userStatsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDetails = req.userDetails;
        let impressionCount = 0;
        let saveCount = 0;
        // calculating total impression on user's post
        const userPostsDetails = yield prisma.post.findMany({
            where: {
                authorId: userDetails.userId
            }
        });
        userPostsDetails.map(post => {
            impressionCount += post.impressionCount;
        });
        // calculating saved articles count
        saveCount = yield prisma.savedPost.count({
            where: {
                userId: userDetails.userId
            }
        });
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ saveCount, impressionCount });
        return;
    }
    catch (err) {
        console.log("Error : @userStatsHandler \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
        return;
    }
});
exports.userStatsHandler = userStatsHandler;

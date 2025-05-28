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
exports.userDetailsHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const userDetailsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedUser = req.params;
        const currentUser = req.userDetails;
        if (!requestedUser.userId) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Missing user id" });
            return;
        }
        const userDetails = yield prisma.user.findFirst({
            where: {
                id: requestedUser.userId,
            }
        });
        if (!userDetails) {
            res
                .status(status_code_1.StatusCode.BadRequest)
                .json({ msg: "The user does not exist" });
            return;
        }
        res
            .status(status_code_1.StatusCode.RequestSuccessfull)
            .json({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            course: userDetails.course,
            branch: userDetails.branch,
            yearOfPassingOut: userDetails.yearOfPassingOut,
            linkedIn: userDetails.linkedIn,
            leetcode: userDetails.leetcode,
            github: userDetails.github,
            gfg: userDetails.gfg,
            xHandle: userDetails.xHandle,
            codeforces: userDetails.codeforces,
            profileUrl: userDetails.profileUrl,
            backgroundImageUrl: userDetails.backgroundImageUrl,
            showEditOption: currentUser.userId == requestedUser.userId ? true : false,
        });
        return;
    }
    catch (err) {
        console.log("Error @userDetailsandler : " + "\n" + err);
        res.json(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
        return;
    }
});
exports.userDetailsHandler = userDetailsHandler;

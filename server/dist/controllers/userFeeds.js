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
exports.getUserFeeds = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const getUserFeeds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUserPosts = yield prisma.post.findMany({
            include: {
                postResource: true,
                tag: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        let response = [];
        for (let post of allUserPosts) {
            // 1. Find the author details of the post for showing on feed
            const authorDetails = yield prisma.user.findFirst({
                where: {
                    id: post.authorId
                }
            });
            if (authorDetails) {
                // 2. Get current userId
                const currentUserDetails = req.userDetails;
                // 3. Get all posts data which have been liked by the current user - whether the user had liked the current post
                const userImpressionsData = yield prisma.postImpression.findMany({
                    where: {
                        userId: currentUserDetails.userId
                    }
                });
                // 4. Extract post Ids liked by the current user
                const postIds = userImpressionsData.map(data => data.postId);
                // 5. Whether user had saved the current post
                const savedPostByCurrentUser = yield prisma.savedPost.findFirst({
                    where: {
                        userId: currentUserDetails.userId,
                        postId: post.id
                    }
                });
                // 6. Create response object
                response.push(Object.assign(Object.assign({}, post), { firstName: authorDetails.firstName, lastName: authorDetails.lastName, branch: authorDetails.branch, yearOfPassingOut: authorDetails.yearOfPassingOut, didUserLiked: postIds.includes(post.id), didUserSaved: savedPostByCurrentUser ? true : false }));
            }
        }
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ data: response });
        return;
    }
    catch (err) {
        console.log("Error : @getUserFeeds \n " + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: 'Server Error' });
        return;
    }
});
exports.getUserFeeds = getUserFeeds;

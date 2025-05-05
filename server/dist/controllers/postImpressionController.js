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
exports.postImpressionHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const postImpressionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.query;
        if (!payload.type || !payload.postId || !payload.impressionType) {
            res
                .status(status_code_1.StatusCode.BadRequest)
                .json({ msg: "Invalid Query Parameters" });
            return;
        }
        if (payload.impressionType === "Report") {
            yield ReportHandler(payload.type, payload.postId);
        }
        else if (payload.impressionType === "Save") {
            const userDetails = req.userDetails;
            yield SavePostHandler(payload.type, payload.postId, userDetails.userId);
        }
        else {
            const userDetails = req.userDetails;
            yield ReactPostHandler(payload.type, payload.postId, userDetails.userId);
        }
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ msg: "Post's Impression updated" });
        return;
    }
    catch (err) {
        console.log("Error : @postImpressionHandler \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Failed to update post stats" });
        return;
    }
});
exports.postImpressionHandler = postImpressionHandler;
const ReportHandler = (type, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postDetails = yield prisma.post.findFirst({
            where: {
                id: postId
            }
        });
        if (postDetails && type === "Decrement") {
            yield prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    reportCount: postDetails.reportCount > 1 ? postDetails.reportCount - 1 : 0
                },
            });
        }
        if (postDetails && type === "Increment") {
            if (postDetails.reportCount + 1 > 20) {
                yield prisma.post.delete({
                    where: {
                        id: postId,
                    },
                });
            }
            else {
                yield prisma.post.update({
                    where: {
                        id: postId,
                    },
                    data: {
                        reportCount: postDetails.reportCount + 1,
                    },
                });
            }
        }
    }
    catch (err) {
        console.log("Error @postImpressionHandler/Report \n" + err);
    }
    return;
});
const SavePostHandler = (type, postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postDetails = yield prisma.post.findFirst({
            where: {
                id: postId
            }
        });
        if (postDetails && type === "Decrement") {
            // 1. Decrement save count in post table
            yield prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    saveCount: postDetails.saveCount > 1 ? postDetails.saveCount - 1 : 0
                }
            });
            // 2. Remove (userId,postId) from savedPost table
            yield prisma.savedPost.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId
                    }
                }
            });
        }
        if (postDetails && type === "Increment") {
            // 1. Update post table
            yield prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    saveCount: postDetails.saveCount + 1
                }
            });
            // 2. Add postId in SavedPost Table along with userId
            yield prisma.savedPost.create({
                data: {
                    userId,
                    postId: postId,
                },
            });
        }
    }
    catch (err) {
        console.log("Error @postImpressionHandler/Save \n" + err);
    }
    return;
});
const ReactPostHandler = (type, postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postDetails = yield prisma.post.findFirst({
            where: {
                id: postId
            }
        });
        if (postDetails && type === "Decrement") {
            // 1. Decrease Post Impression Count
            yield prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    impressionCount: postDetails.impressionCount > 1 ? postDetails.impressionCount - 1 : 0
                }
            });
            // 2. Remove (postId,userId) from postImpression table
            yield prisma.postImpression.delete({
                where: {
                    postId_userId: {
                        postId,
                        userId
                    }
                }
            });
        }
        if (postDetails && type === "Increment") {
            // 1. Update impression count in post table
            yield prisma.post.update({
                where: {
                    id: postId
                },
                data: {
                    impressionCount: postDetails.impressionCount + 1
                }
            });
            // 2. Add (postId,userId) in postImpression table
            yield prisma.postImpression.create({
                data: {
                    userId,
                    postId
                }
            });
        }
    }
    catch (err) {
        console.log("Error @postImpressionHandler/React \n" + err);
    }
    return;
});

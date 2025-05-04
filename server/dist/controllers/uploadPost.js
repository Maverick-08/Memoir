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
exports.handleImageUpload = void 0;
const status_code_1 = require("../config/status-code");
const AWS_config_1 = require("../config/AWS-config");
const dotenv_1 = require("dotenv");
const client_s3_1 = require("@aws-sdk/client-s3");
const client_1 = require("@prisma/client");
(0, dotenv_1.config)();
const prisma = new client_1.PrismaClient();
const handleImageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        const postContent = req.body.content;
        const userDetails = req.userDetails;
        const postTags = getPostTags(postContent);
        const uploadResults = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const command = new client_s3_1.PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `${Date.now()}_${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read", // or your preferred ACL
            });
            yield AWS_config_1.s3.send(command);
            return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${command.input.Key}`;
        })));
        const createPostResponse = yield prisma.post.create({
            data: {
                authorId: userDetails.userId,
                content: postContent
            }
        });
        for (let imageUrl of uploadResults) {
            yield prisma.postImageResources.create({
                data: {
                    postId: createPostResponse.id,
                    imageUrl
                }
            });
        }
        for (let tag of postTags) {
            yield prisma.tags.create({
                data: {
                    postId: createPostResponse.id,
                    tagName: tag
                }
            });
        }
        res.status(status_code_1.StatusCode.ResourceCreated).json({ msg: "working" });
    }
    catch (err) {
        console.log("Error : @handleImageUpload :\n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Your post could not be created" });
    }
});
exports.handleImageUpload = handleImageUpload;
const getPostTags = (content) => {
    const postTags = [];
    const words = content.split(" ");
    for (let word of words) {
        if (word.startsWith("#")) {
            postTags.push(word.split("#")[1].toUpperCase());
        }
    }
    return postTags;
};

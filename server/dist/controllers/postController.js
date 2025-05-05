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
exports.postCreationhandler = void 0;
const status_code_1 = require("../config/status-code");
const dotenv_1 = require("dotenv");
const client_1 = require("@prisma/client");
(0, dotenv_1.config)();
const prisma = new client_1.PrismaClient();
const postCreationhandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileInfo = req.files;
        ;
        const postContent = req.body.content;
        const userDetails = req.userDetails;
        const postTags = getPostTags(postContent);
        // console.log(fileInfo);
        // 1. Create Post
        const postInfo = yield prisma.post.create({
            data: {
                authorId: userDetails.userId,
                content: postContent
            }
        });
        // 2. Save Image Url's of post
        if (fileInfo) {
            for (let file of fileInfo) {
                yield prisma.postImageResources.create({
                    data: {
                        postId: postInfo.id,
                        imageUrl: file.location
                    }
                });
            }
        }
        // 3. Create post tag's
        for (let tag of postTags) {
            yield prisma.tags.create({
                data: {
                    postId: postInfo.id,
                    tagName: tag
                }
            });
        }
        res.status(status_code_1.StatusCode.ResourceCreated).json({ msg: "Post created successfully !" });
    }
    catch (err) {
        console.log("Error : @handleImageUpload :\n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Your post could not be created" });
    }
});
exports.postCreationhandler = postCreationhandler;
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
//  ->  Req.files
// [
//   {
//     fieldname: 'images',
//     originalname: 'image3.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     size: 401413,
//     bucket: 'memoir-s3-bucket',
//     key: 'post/images/e8b606c4-a163-402d-b4fe-16f85399950b-image3.png',
//     acl: 'private',
//     contentType: 'application/octet-stream',
//     contentDisposition: null,
//     contentEncoding: null,
//     storageClass: 'STANDARD',
//     serverSideEncryption: null,
//     metadata: undefined,
//     location: 'https://memoir-s3-bucket.s3.ap-south-1.amazonaws.com/post/images/e8b606c4-a163-402d-b4fe-16f85399950b-image3.png',
//     etag: '"96274d535dbe4523fd071fa772035290"',
//     versionId: undefined
//   }
// ]

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPostImage = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const AWS_config_1 = require("./AWS-config");
const uuid_1 = require("uuid");
exports.uploadPostImage = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: AWS_config_1.s3,
        bucket: process.env.AWS_S3_BUCKET,
        key: (req, file, cb) => {
            cb(null, `post/images/${(0, uuid_1.v4)()}-${file.originalname}`);
        },
    }),
});

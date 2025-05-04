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
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const handleImageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        console.log(files);
        console.log(req.body.content);
        // const uploadResults = await Promise.all(
        //   files.map(async (file) => {
        //     const command = new PutObjectCommand({
        //       Bucket: process.env.AWS_S3_BUCKET!,
        //       Key: `${Date.now()}_${file.originalname}`,
        //       Body: file.buffer,
        //       ContentType: file.mimetype,
        //       ACL: "public-read", // or your preferred ACL
        //     });
        //     await s3.send(command);
        //     return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${command.input.Key}`;
        //   })
        // );
        res.status(status_code_1.StatusCode.ResourceCreated).json({ msg: "working" });
    }
    catch (err) {
        console.log("Error : @handleImageUpload :\n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Your post could not be created" });
    }
});
exports.handleImageUpload = handleImageUpload;

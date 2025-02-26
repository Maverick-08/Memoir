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
exports.getUserUpdates = exports.postUserUpdates = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const postUserUpdates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extract the content
        const post = req.body;
        // 2. Check whether post title is empty or not
        if (!post.title) {
            res.json(status_code_1.StatusCode.BadRequest).json({ msg: "Title field cannot be empty" });
            return;
        }
        // 3. Extract user details from the request header
        const userDetails = req.userDetails;
        // 4. Create the record
        post.email = userDetails.email;
        post.name = userDetails.name;
        post.degree = userDetails.degree;
        post.branch = userDetails.branch;
        post.yearOfPassingOut = userDetails.yearOfPassingOut;
        post.createdAt = new Date();
        // 5. Insert the record in the database
        yield prisma.post.create({
            data: post
        });
        res.status(status_code_1.StatusCode.ResourceCreated).json({ msg: "Post has been created" });
        return;
    }
    catch (err) {
        console.log("Error @postUserUpdates \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Error creating the post" });
        return;
    }
});
exports.postUserUpdates = postUserUpdates;
const getUserUpdates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield prisma.post.findMany();
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ data: allPosts });
        return;
    }
    catch (err) {
        console.log("Error @getUserUpdates \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Error fetching the post" });
        return;
    }
});
exports.getUserUpdates = getUserUpdates;

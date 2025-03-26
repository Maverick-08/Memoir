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
exports.addReviews = void 0;
const status_code_1 = require("../config/status-code");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        if (!payload.email || !payload.name || !payload.message) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Invalid Payload" });
            return;
        }
        yield prisma.reviews.create({
            data: {
                name: payload.name,
                email: payload.email,
                message: payload.message
            }
        });
        res.status(status_code_1.StatusCode.ResourceCreated).json({ msg: "Review added successfully" });
        return;
    }
    catch (err) {
        console.log("Error @addReviews : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server Error" });
        return;
    }
});
exports.addReviews = addReviews;

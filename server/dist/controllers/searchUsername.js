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
exports.searchUsernameHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const prisma = new client_1.PrismaClient();
const searchUsernameHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const payload = req.query;
        const response = yield prisma.user.findMany({
            where: {
                firstName: payload.firstName,
                lastName: (_a = payload.lastName) !== null && _a !== void 0 ? _a : ""
            }
        });
        const responseData = response.map(user => {
            var _a;
            return {
                name: `${user.firstName} ${(_a = user.lastName) !== null && _a !== void 0 ? _a : ""}`.trim(),
                userId: user.id,
                branch: user.branch,
                yearOfPassingOut: user.yearOfPassingOut
            };
        });
        res.status(status_code_1.StatusCode.RequestSuccessfull).json({ data: responseData });
    }
    catch (err) {
        console.log("Error : @searchUsernameHandler \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Internal Server Error" });
    }
});
exports.searchUsernameHandler = searchUsernameHandler;

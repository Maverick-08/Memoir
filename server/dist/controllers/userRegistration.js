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
exports.createPassword = exports.userRegistrationHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const otpController_1 = require("./otpController");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
const userRegistrationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Extract the payload from req body
        const payload = req.body;
        // 2. Validate the data
        const isPayloadValid = validatePayload(payload);
        if (!isPayloadValid.status) {
            res.status(status_code_1.StatusCode.BadRequest).json(isPayloadValid.msg);
            return;
        }
        // 3. Check if the user does not already exist in the database
        const userExist = yield prisma.user.findFirst({
            where: { email: payload.email },
        });
        if (userExist) {
            res.status(status_code_1.StatusCode.Conflict).json({ msg: "User already exist" });
            return;
        }
        // 4. If user does not exist then create the record
        const record = Object.assign({}, payload);
        // 5. Enter the record into the database
        const response = yield prisma.user.create({
            data: record,
        });
        // 6. Send an otp for verification
        yield (0, otpController_1.sendOTP)(response.id, response.email);
        res
            .status(status_code_1.StatusCode.ResourceCreated)
            .json({ userId: response.id, firstName: response.firstName, lastName: response.lastName, email: response.email, course: response.course, branch: response.branch, yearOfPassingOut: response.yearOfPassingOut, linkedIn: response.linkedIn, codeforces: response.codeforces, leetcode: response.leetcode, gfg: response.gfg, github: response.github, xHandle: response.xHandle });
        return;
    }
    catch (err) {
        console.log("Error @userRegistrationHandler \n", err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server error" });
        return;
    }
});
exports.userRegistrationHandler = userRegistrationHandler;
const createPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        if (!payload.password) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Password is missing" });
            return;
        }
        const hashedPassword = yield (0, bcrypt_1.hash)(payload.password, 10);
        yield prisma.user.update({
            where: {
                id: payload.userId
            },
            data: {
                password: hashedPassword
            }
        });
        res.status(status_code_1.StatusCode.ResourceCreated).json({ msg: "Password Created" });
        return;
    }
    catch (err) {
        console.log("Error : @userPassword \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Failed to create the password" });
    }
});
exports.createPassword = createPassword;
const validatePayload = (payload) => {
    if (!payload.firstName)
        return { status: false, msg: "Name field is missing" };
    else if (!payload.lastName)
        return { status: false, msg: "Last Name field is missing" };
    else if (!payload.email)
        return { status: false, msg: "Email field is missing" };
    else if (!payload.course || !payload.branch || !payload.yearOfPassingOut)
        return { status: false, msg: "Course Details is missing" };
    return { status: true, msg: "" };
};
/*    Input

{
    "name":"Vivek Ojha",
    "email":"ojhavivek24@gmail.com",
    "password":"Vivek@2001",
    "degree":"MCA",
    "branch":"Not Applicable",
    "yearOfPassingOut":2026,
    "linkedIn":"jhds",
    "xHandle":"jksdk"
}

*/

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
exports.userRegistrationHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
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
        // Hash the password
        const hashedPassword = yield (0, bcrypt_1.hash)(payload.password, 10);
        const record = Object.assign(Object.assign({}, payload), { password: hashedPassword });
        // 5. Enter the record into the database
        yield prisma.user.create({
            data: record,
        });
        res
            .status(status_code_1.StatusCode.ResourceCreated)
            .json({ msg: "Your account has been created !" });
        return;
    }
    catch (err) {
        console.log("Error @userRegistrationHandler \n", err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server error" });
        return;
    }
});
exports.userRegistrationHandler = userRegistrationHandler;
const validatePayload = (payload) => {
    if (!payload.name)
        return { status: false, msg: "Name field is missing" };
    else if (!payload.email)
        return { status: false, msg: "Email field is missing" };
    else if (!payload.registrationNumber)
        return { status: false, msg: "Registration Number is missing" };
    else if (!payload.degree || !payload.branch || !payload.yearOfPassingOut)
        return { status: false, msg: "Course Details is missing" };
    else if (!payload.password)
        return { status: false, msg: "Password field is missing" };
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

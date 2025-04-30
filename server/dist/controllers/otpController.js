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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOTP = exports.sendOTP = exports.verifyOtp = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const status_code_1 = require("../config/status-code");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const response = yield prisma.oTP.findFirst({
            where: {
                userId: payload.userId,
            },
        });
        if (response && response.otp == payload.otp) {
            yield prisma.user.update({
                where: {
                    id: payload.userId,
                },
                data: {
                    verified: true,
                },
            });
            res.status(status_code_1.StatusCode.RequestSuccessfull).json({ msg: "User Verified" });
            return;
        }
        else {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Invalid OTP" });
            return;
        }
    }
    catch (err) {
        console.log("Error @verifyOtp : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server error" });
    }
});
exports.verifyOtp = verifyOtp;
const sendOTP = (userId, receiverEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Create an OTP
        const otp = Math.floor(Math.random() * 900000) + 100000;
        // 2. Check if user id exist
        const userIdExist = yield prisma.oTP.findFirst({
            where: {
                userId,
            },
        });
        // 2.1 If it exists then update the new otp
        if (userIdExist) {
            yield prisma.oTP.update({
                where: {
                    userId,
                },
                data: {
                    otp,
                },
            });
        }
        // 2.2 otherwise create new otp
        else {
            yield prisma.oTP.create({
                data: {
                    userId,
                    otp,
                },
            });
        }
        // 3. Create a transporter object
        const transporter = nodemailer_1.default.createTransport({
            name: 'gmail.com',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EmailId,
                pass: process.env.EmailPasscode,
            },
            pool: true,
        });
        // 4. Create mail options
        const mailOptions = {
            from: "organizationmemoir@gmail.com",
            to: receiverEmail,
            subject: `OTP Verification `,
            html: `<p>Thank You for choosing Memoir !</p><p>Your OTP is: <b>${otp}</b></p><p>Sent at: ${new Date().toLocaleString()}</p>`,
        };
        // 5. Send Mail
        yield transporter.sendMail(mailOptions);
        return;
    }
    catch (err) {
        console.log("Error @otpHandler : \n" + err);
        return;
    }
});
exports.sendOTP = sendOTP;
const resendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.query;
        if (!payload.email || !payload.userId) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Invalid Payload" });
            return;
        }
        yield (0, exports.sendOTP)(payload.userId, payload.email);
        res
            .status(status_code_1.StatusCode.RequestSuccessfull)
            .json({
            msg: `OTP sent on ${payload.email.slice(0, 6) +
                "*******" +
                payload.email.slice(-payload.email.length, -payload.email.length + 3)} successfully !`,
        });
        return;
    }
    catch (err) {
        console.log("Error @verifyOTP : \n" + err);
        return;
    }
});
exports.resendOTP = resendOTP;

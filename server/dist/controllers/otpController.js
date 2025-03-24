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
exports.OTPHandler = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const status_code_1 = require("../config/status-code");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const OTPHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.query;
    // console.log(payload);
    try {
        if (payload.otp) {
            verifyOtp(req, res, {
                email: payload.email,
                otp: Number(payload.otp),
            });
        }
        else {
            sendOTP(req, res, payload.email);
        }
    }
    catch (err) {
        console.log("Error @otpHandler : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server error" });
    }
});
exports.OTPHandler = OTPHandler;
const sendOTP = (req, res, receiverEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "organizationmemoir@gmail.com",
                pass: "nujq uhmi wefu ando",
            },
        });
        const otp = Math.floor(Math.random() * 9000) + 1000;
        const userExist = yield prisma.user.findFirst({
            where: {
                email: receiverEmail
            }
        });
        if (userExist) {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "User is already registered !" });
            return;
        }
        const userData = yield prisma.oTP.findFirst({
            where: {
                email: receiverEmail,
            },
        });
        let response;
        if (userData) {
            response = yield prisma.oTP.update({
                where: {
                    email: userData.email
                },
                data: {
                    otp: [...userData.otp, otp]
                }
            });
        }
        else {
            response = yield prisma.oTP.create({
                data: {
                    email: receiverEmail,
                    otp: [otp],
                },
            });
        }
        if (response) {
            const mailOptions = {
                from: "organizationmemoir@gmail.com",
                to: receiverEmail,
                subject: "OTP for Account Registration",
                html: `
                <h2>Thank you for choosing Memoir!</h2>
                <p>Your OTP for account registration is: <strong>${otp}</strong></p>
                <p>Please enter this OTP to complete your registration.</p>
              `,
            };
            transporter.sendMail(mailOptions);
            res.sendStatus(status_code_1.StatusCode.RequestSuccessfull);
        }
        else {
            throw new Error("Failed to sent otp");
        }
        return;
    }
    catch (err) {
        console.log("Error @otpHandler : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server error" });
        return;
    }
});
const verifyOtp = (req, res, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield prisma.oTP.findFirst({
            where: {
                email: payload.email,
            },
        });
        if (!userData) {
            res
                .status(status_code_1.StatusCode.BadRequest)
                .json({ msg: "User has not completed registration yet" });
            return;
        }
        if (userData.otp.includes(payload.otp)) {
            yield prisma.oTP.update({
                where: {
                    email: payload.email
                },
                data: {
                    isVerified: true
                }
            });
            res.sendStatus(status_code_1.StatusCode.RequestSuccessfull);
        }
        else {
            res.status(status_code_1.StatusCode.BadRequest).json({ msg: "Invalid OTP" });
        }
        return;
    }
    catch (err) {
        console.log("Error @verifyOtp : \n" + err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Server error" });
        return;
    }
});
/*
 ->    req.query
 {email:"",otp:}

 ->  userData
 null
userData : [object Object]

*/ 

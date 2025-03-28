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
exports.userAuthenticationHandler = void 0;
const client_1 = require("@prisma/client");
const status_code_1 = require("../config/status-code");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const prisma = new client_1.PrismaClient();
const TOKEN_KEY = process.env.TOKEN_KEY;
const userAuthenticationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Get email and password
    // 2. check if email exists in our db
    // 3. compare the password
    // 4. generate authentication cookie
    // 5. set it on response header
    // 6. store it in database
    try {
        // 1. Extract the payload from req body
        const payload = req.body;
        // 2. Validate the data
        const isPayloadValid = validatePayload(payload);
        if (!isPayloadValid.status) {
            res.status(status_code_1.StatusCode.BadRequest).json(isPayloadValid.msg);
            return;
        }
        // 3. Check if the user exists in our database
        const userExist = yield prisma.user.findFirst({
            where: { email: payload.email },
        });
        if (!userExist) {
            // If user does not exist
            res.status(status_code_1.StatusCode.Unauthorized).json({ msg: "User does not exist" });
            return;
        }
        const responseData = {
            email: userExist.email,
            name: userExist.name,
            registrationNumber: userExist.registrationNumber,
            degree: userExist.degree,
            branch: userExist.branch,
            yearOfPassingOut: userExist.yearOfPassingOut,
            linkedIn: userExist.linkedIn,
            xHandle: userExist.xHandle,
        };
        // IMPORTANT : Uncomment once mail service is setup
        // 4. Check if the user is verified
        // if(!userExist.isVerified){
        //     res.status(StatusCode.Unauthorized).json({msg:"User is not verified"})
        //     return
        // }
        // 5. Generate the authentication cookie
        const __authCookie__ = jsonwebtoken_1.default.sign(responseData, TOKEN_KEY, {
            expiresIn: "30d",
        });
        // 6. Set the cookie in the response header
        // Development : {httpOnly:true,sameSite:"lax",maxAge:24*60*60*1000}
        res.cookie("__authCookie__", __authCookie__, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        // Production : {httpOnly:true,sameSite:"none",secure:true,maxAge:24*60*60*1000}
        // res.cookie("__authCookie__", __authCookie__, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "none",
        //   maxAge: 30 * 24 * 60 * 60 * 1000,
        // });
        res.status(status_code_1.StatusCode.RequestSuccessfull).json(Object.assign({}, responseData));
        return;
    }
    catch (err) {
        console.log("Error @userAuthenticationHandler \n", err);
        res.status(status_code_1.StatusCode.ServerError).json({ msg: "Internal Server error" });
        return;
    }
});
exports.userAuthenticationHandler = userAuthenticationHandler;
const validatePayload = (payload) => {
    if (!payload.email)
        return { status: false, msg: "Email field is missing" };
    else if (!payload.password)
        return { status: false, msg: "Password field is missing" };
    return { status: true, msg: "" };
};
/*    Input

{
    "email":"ojhavivek24@gmail.com",
    "password":"Vivek@2001",
}

    Output : If user exist in the database
{
  email: 'ojhavivek24@gmail.com',
  password: '$2b$10$tlv59fpSRHKQuWpFoNMIY.cyjqsnhO4Z.delWt95oFG6MAMsnHrUy',
  name: 'Vivek Ojha',
  degree: 'MCA',
  branch: 'Not Applicable',
  yearOfPassingOut: 2026,
  isVerified: false,
  linkedIn: 'jhds',
  xHandle: 'jksdk',
  createdAt: 2025-02-25T05:37:04.497Z,
}

Output : If user does not exist in our database
null

*/

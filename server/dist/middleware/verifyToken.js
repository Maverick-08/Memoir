"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_code_1 = require("../config/status-code");
const TOKEN_KEY = process.env.TOKEN_KEY;
const verifyToken = (req, res, next) => {
    // 1. Extract the token
    const token = req.cookies.__authCookie__;
    // 2. Check if token exist or not
    if (!token) {
        res.status(status_code_1.StatusCode.Unauthorized).json({ msg: "Auth Token is missing" });
        return;
    }
    // 3. If token exists then verify it and set the details in the request header
    jsonwebtoken_1.default.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            res.status(403).json({ msg: "Invalid Token" });
            return;
        }
        else {
            req['userDetails'] = decoded;
            next();
        }
    });
};
exports.verifyToken = verifyToken;
/* req.cookies

{
  __authCookie__: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9qaGF2aXZlazI0QGdtYWlsLmNvbSIsImlhdCI6MTc0MDU2MDA2OCwiZXhwIjoxNzQwNTYwMDk4fQ.JQBlL1GYz_SKzkYJJKd904ki3ivd1QRIp59ztXo28nE'
}

Decoded
{
  "email": "ojhavivek24@gmail.com",
  "name": "Vivek Ojha",
  "degree": "MCA",
  "branch": "Not Applicable",
  "yearOfPassingOut": 2026,
  "linkedIn": "jhds",
  "xHandle": "jksdk",
  "iat": 1741685726,
  "exp": 1744277726
}

*/ 

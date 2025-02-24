"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsOptions = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = process.env.PORT || 3000;
exports.CorsOptions = {
    credentials: true,
    origin: "http://localhost:5173"
};

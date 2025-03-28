"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_config_1 = require("./config/app-config");
const verifyToken_1 = require("./middleware/verifyToken");
const health_checkpoint_1 = __importDefault(require("./routes/health-checkpoint"));
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const logout_1 = __importDefault(require("./routes/logout"));
const updates_1 = __importDefault(require("./routes/updates"));
const interviewExperience_1 = __importDefault(require("./routes/interviewExperience"));
const token_checkpoint_1 = __importDefault(require("./routes/token-checkpoint"));
const review_1 = __importDefault(require("./routes/review"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     // console.log(origin) http://localhost:5173
//     res.header("Access-Control-Allow-Origin", "http://13.233.104.37:80");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            "https://memoir-ochre.vercel.app",
            "http://13.233.104.37"
        ];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the requested origin
        }
        else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    credentials: true
}));
// For checking whether server is running
app.use("/", health_checkpoint_1.default);
// Register new user
app.use("/register", register_1.default);
// Authenticate user
app.use("/auth", auth_1.default);
// User Reviews
app.use("/reviews", review_1.default);
// Protected routes
app.use(verifyToken_1.verifyToken);
// Token Checkpoint
app.use("/token", token_checkpoint_1.default);
// User updates
app.use("/update", updates_1.default);
// User interview experience
app.use("/experience", interviewExperience_1.default);
// User sign out
app.use("/signout", logout_1.default);
app.listen(app_config_1.PORT, () => {
    console.log(`Server running on ${app_config_1.PORT}`);
});

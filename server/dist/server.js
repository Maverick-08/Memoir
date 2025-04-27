"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_config_1 = require("./config/app-config");
const ws_1 = require("ws");
const verifyToken_1 = require("./middleware/verifyToken");
const health_checkpoint_1 = __importDefault(require("./routes/health-checkpoint"));
const register_1 = __importDefault(require("./routes/register"));
const auth_1 = __importDefault(require("./routes/auth"));
const logout_1 = __importDefault(require("./routes/logout"));
// import Updates from "./routes/updates";
const interviewExperience_1 = __importDefault(require("./routes/interviewExperience"));
const token_checkpoint_1 = __importDefault(require("./routes/token-checkpoint"));
const review_1 = __importDefault(require("./routes/review"));
const messages_1 = __importDefault(require("./routes/messages"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://memoir.dev-projects.site"],
    credentials: true
}));
const httpServer = app.listen(app_config_1.PORT, () => {
    console.log(`Server running on ${app_config_1.PORT}`);
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', (socket) => {
    socket.on('error', console.error);
    socket.on('message', (data, isBinary) => {
        wss.clients.forEach(client => {
            if (client.readyState === ws_1.WebSocket.OPEN && socket != client) {
                socket.send(data, { binary: isBinary });
            }
        });
    });
});
// For checking whether server is running
app.use("/api", health_checkpoint_1.default);
// Register new user
app.use("/api/register", register_1.default);
// Authenticate user
app.use("/api/auth", auth_1.default);
// User Reviews
app.use("/api/reviews", review_1.default);
// Protected routes
app.use(verifyToken_1.verifyToken);
// Token Checkpoint
app.use("/api/token", token_checkpoint_1.default);
// // User updates
// app.use("/api/update", Updates);
// User Message
app.use("/api/message", messages_1.default);
// User interview experience
app.use("/api/experience", interviewExperience_1.default);
// User sign out
app.use("/api/signout", logout_1.default);

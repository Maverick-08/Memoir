"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_config_1 = require("./config/app-config");
const health_checkpoint_1 = __importDefault(require("./routes/health-checkpoint"));
const register_1 = __importDefault(require("./routes/register"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(app_config_1.CorsOptions));
// For checking whether server is running
app.use("/", health_checkpoint_1.default);
// Register new user
app.use("/register", register_1.default);
app.listen(app_config_1.PORT, () => {
    console.log(`Server running on ${app_config_1.PORT}`);
});

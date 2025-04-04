import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CorsOptions, PORT } from "./config/app-config";
import { verifyToken } from "./middleware/verifyToken";
import HealthCheckPoint from "./routes/health-checkpoint";
import Register from "./routes/register";
import Authenticate from "./routes/auth";
import Signout from "./routes/logout";
import Updates from "./routes/updates";
import InterviewExperience from "./routes/interviewExperience";
import TokenCheckPoint from "./routes/token-checkpoint";
import Reviews from "./routes/review";

const app = express();

app.use(express.json());
app.use(cookieParser());
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
app.use(cors({
  origin:["http://localhost:5173","https://memoir.dev-projects.site"],
  credentials: true
}));

// For checking whether server is running
app.use("/api", HealthCheckPoint);

// Register new user
app.use("/api/register", Register);

// Authenticate user
app.use("/api/auth", Authenticate);

// User Reviews
app.use("/api/reviews",Reviews);

// Protected routes
app.use(verifyToken);

// Token Checkpoint
app.use("/api/token", TokenCheckPoint);

// User updates
app.use("/api/update", Updates);

// User interview experience
app.use("/api/experience", InterviewExperience);


// User sign out
app.use("/api/signout", Signout);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
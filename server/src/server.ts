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

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    const origin = req.headers.origin;
    // console.log(origin) http://localhost:5173
    
    // res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header(
    //     "Access-Control-Allow-Headers",
    //     "Origin, X-Requested-With, Content-Type, Accept"
    // );
    next();
});
app.use(cors({
    origin(requestOrigin, callback) {
        if(["http://localhost:5173","http://localhost:3000"].includes(requestOrigin as string)){
            // console.log(requestOrigin); http://localhost:5173
            callback(null,true);
        }
        else{
            callback(new Error("Blocked by cors"));
        }
    },
    credentials:true
}));

// For checking whether server is running
app.use("/", HealthCheckPoint);

// Register new user
app.use("/register", Register);

// Authenticate user
app.use("/auth", Authenticate);

// Protected routes
app.use(verifyToken);

// Token Checkpoint
app.use("/token", TokenCheckPoint);

// User updates
app.use("/update", Updates);

// User interview experience
app.use("/experience", InterviewExperience);

// User sign out
app.use("/signout", Signout);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

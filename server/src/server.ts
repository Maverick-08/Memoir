import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {CorsOptions, PORT} from './config/app-config'
import { verifyToken } from './middleware/verifyToken';
import HealthCheckPoint from './routes/health-checkpoint'
import Register from './routes/register';
import Authenticate from './routes/auth';
import Signout from './routes/logout';
import Updates from './routes/updates';
import InterviewExperience from './routes/interviewExperience';


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(CorsOptions))

// For checking whether server is running
app.use("/",HealthCheckPoint)

// Register new user
app.use("/register",Register)

// Authenticate user
app.use("/auth",Authenticate)

// Protected routes
app.use(verifyToken)

// User updates
app.use("/update",Updates)

// User interview experience
app.use("/experience",InterviewExperience)

// User sign out
app.use("/signout",Signout)

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {CorsOptions, PORT} from './config/app-config'
import HealthCheckPoint from './routes/health-checkpoint'
import Register from './routes/register'
import Authenticate from './routes/auth'

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

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {CorsOptions, PORT} from './config/app-config'
import HealthCheckPoint from './routes/health-checkpoint'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(CorsOptions))

// For checking whether server is running
app.use("/",HealthCheckPoint)


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})
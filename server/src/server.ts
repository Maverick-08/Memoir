import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin: "http://localhost:5173"
}))

app.get("/",(req,res) => {
    res.json({msg:"Server is healthy"})
})


app.listen(3000,()=>{
    console.log("Server is running")
})
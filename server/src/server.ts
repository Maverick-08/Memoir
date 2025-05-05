import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/app-config";
import { WebSocket, WebSocketServer } from "ws";
import { verifyToken } from "./middleware/verifyToken";
import HealthCheckPoint from "./routes/health-checkpoint";
import Register from "./routes/register";
import Authenticate from "./routes/auth";
import Signout from "./routes/logout";
import Feed from "./routes/feed";
import InterviewExperience from "./routes/interviewExperience";
import TokenCheckPoint from "./routes/token-checkpoint";
import Review from "./routes/review";
import Message from "./routes/messages";
import Post from "./routes/createPost";
import User from "./routes/user";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:5173","https://memoir.dev-projects.site"],
  credentials: true
}));

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const wss = new WebSocketServer({server:httpServer});

wss.on('connection',(socket) => {
  socket.on('error',console.error)

  socket.on('message',(data,isBinary) => {
    wss.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN && socket != client){
        socket.send(data,{binary:isBinary});
      }
    })
  })
})

// For checking whether server is running
app.use("/api", HealthCheckPoint);

// Register new user
app.use("/api/register", Register);

// Authenticate user
app.use("/api/auth", Authenticate);

// User Reviews
app.use("/api/reviews",Review);

// Protected routes
app.use(verifyToken);

// Token Checkpoint
app.use("/api/token", TokenCheckPoint);

// // User Feed
app.use("/api/feed", Feed);

// Uploads
app.use("/api/post",Post)

// User
app.use("/api/user",User);

// User Message
app.use("/api/message",Message)

// User interview experience
app.use("/api/experience", InterviewExperience);


// User sign out
app.use("/api/signout", Signout);


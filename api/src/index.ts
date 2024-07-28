import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./lib/db";
import cors from "cors";
import { UserRouter } from "./routes/user.route";
import { verifyToken } from "./middleware/middleware";
import { uploadImage } from "./services/cloudinary";
import multer from "multer";
import { PostRouter } from "./routes/post.route";
import { NotifyRouter } from "./routes/notify.route";
import { Notification } from "./models/notification.model";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const storage = multer.diskStorage({});
export const upload = multer({ storage });

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDatabase();

const server = http.createServer(app);
export const io = new SocketIOServer(server, {
    cors: {
        origin: "http://localhost:5173" || "https://social0.onrender.com/",
    }
});

io.on('connection', (socket) => {
    console.log('New client connected with ID:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected with ID:', socket.id);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure CORS
app.use(cors({ credentials: true }));

app.use("/api/user", UserRouter);
app.use("/api/post", verifyToken, PostRouter);
app.use("/api/notify", verifyToken, NotifyRouter);
app.post("/api/upload", verifyToken, upload.single("file"), uploadImage);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});


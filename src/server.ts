import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
//initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
//setup utility middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setup first endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200);
  res.send("Hello, TypeScript with Express and ES6 modules!");
});
//create http server and attach socketio to it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    //client url
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id}`);
});
//start server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

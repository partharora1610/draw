import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

let roomIdGlobal: any, imgUrlGlobal: any;

io.on("connection", (socket: Socket) => {
  socket.on("join-room", (data) => {
    console.log("data", data);
    const { roomId, name, host, userId, presenter } = data;
    roomIdGlobal = roomId;

    socket.join(roomId);

    socket.emit("userJoined", {
      success: true,
    });
    socket.broadcast.to(roomId).emit("canvasData", {
      imgUrl: imgUrlGlobal,
    });
  });

  socket.on("canvas-data", (data) => {
    imgUrlGlobal = data;
    socket.broadcast
      .to(roomIdGlobal)
      .emit("canvasDataResponse", { imgUrl: data });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

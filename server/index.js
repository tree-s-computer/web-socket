import express from "express";
import { Server } from "socket.io";
import path from "path";
import http from "http";

const port = 8080;

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/src")));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("연결이 이루어졌습니다.");

  socket.on("chatting", (data) => {
    console.log(data);
    io.emit("chatting", data);
  });
});

server.listen(port, () => {
  console.log("Listening on " + port);
});

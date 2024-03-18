import express from "express";
import { Server } from "socket.io";
import path from "path";
import http from "http";

const port = 8080;

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/src")));

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    console.log(data);
    io.emit("chatting", "그래 반가워" + data);
  });
});

server.listen(port, () => {
  console.log("Listening on " + port);
});

import express from "express";
import { Server } from "socket.io";
import path from "path";
import http from "http";

const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/src")));

const port = 8080;

server.listen(port, () => {
  console.log("Listening on " + port);
});
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("연결이 이루어져따");
});

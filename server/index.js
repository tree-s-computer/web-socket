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

  // 접속한 클라이언트의 정보가 수신되면
  socket.on("chatting", (data) => {
    io.emit("chatting", data);
    // 접속된 모든 클라이언트에게 메시지를 전송한다
  });

  socket.on("login", (data) => {
    //2
    const { name, userid } = data;
    console.log("Client logged-in:\n name:" + name + "\n userid: " + userid);

    // socket에 클라이언트 정보를 저장한다
    socket.name = name;
    socket.userid = userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit("login", name); //3
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on("chat", (data) => {
    //data : 수신된 메세지 내용
    console.log("Message from %s: %s", socket.name, data.msg);

    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit("chat", msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    // socket.emit('s2c chat', msg);

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    // io.emit('s2c chat', msg);

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data);
  });
});

server.listen(port, () => {
  console.log("Listening on " + port);
});

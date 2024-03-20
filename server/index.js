import express from "express";
import { Server } from "socket.io";
import path from "path";
import http from "http";

const port = 8080;

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/client/src")));

app.get("/index-room", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/src/index-room.html"));
});

app.get("/index-room2", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/src/index-room2.html"));
});

// 기본 라우팅은 index.html을 제공
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/src/index.html"));
});

const server = http.createServer(app);
const io = new Server(server);

// "/chat" 네임스페이스에 대한 소켓 이벤트 처리
const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("chat namespace connection");

  socket.on("chat message", (data) => {
    console.log("message from client: ", data);

    const name = (socket.name = data.name);
    const room = (socket.room = data.room);

    // room에 join한다
    socket.join(room);
    // room에 join되어 있는 클라이언트에게 메시지를 전송한다
    chatNamespace.to(room).emit("chat message", data.msg);
  });

  socket.on("chat message", () => {});
});

// 기본 네임스페이스에 대한 소켓 이벤트 처리
io.on("connection", (socket) => {
  console.log("connection 기본 ㄴ ㅔ임 스페이스");

  socket.emit("usercount", io.engine.clientsCount);
  socket.join("채팅방 1");

  socket.on("message", (msg, roomname) => {
    console.log("Message received: " + msg);
    console.log("RoomName" + roomname);
    io.to(roomname).emit("message", msg);
  });

  socket.on("joinRoom", (roomname, roomToJoin) => {
    socket.leave(roomname); // 기존의 룸을 나가고
    socket.join(roomToJoin); // 들어갈 룸에 들어간다.
    // 룸을 성공적으로 전환했다는 신호 발송
    socket.emit("roomChanged", roomToJoin);
  });

  socket.on("chatting", (data) => {
    io.emit("chatting", data);
  });

  socket.on("login", (data) => {
    const { name, userid } = data;
    console.log("Client logged-in:\n name:" + name + "\n userid: " + userid);

    socket.name = name;
    socket.userid = userid;

    io.emit("login", name);
  });

  socket.on("chat", (data) => {
    console.log("Message from %s: %s", socket.name, data.msg);

    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    socket.broadcast.emit("chat", msg);
  });
});

server.listen(port, () => {
  console.log("Listening on " + port);
});

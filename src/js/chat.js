"use strict";

const socket = io();
socket.emit("chatting", "from front");
socket.on("chatting", (data) => {
  console.log(data);
});

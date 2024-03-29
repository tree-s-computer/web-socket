"use strict";

const socket = io();
// io 함수는 알아서 socket.io를 실행하고 있는 서버를 찾는다.

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const form = document.querySelector("form");

const loginInfo = {
  name: 123456789,
  userid: "ungmo2@gmail.com",
};

socket.emit("login", loginInfo); //1
socket.on("login", (data) => {
  //4
  //like fetch : get
  chatList.innerText = data + "님이 로그인 했어요. ";
});

const createChatList = (data) => {
  const { name, msg } = data;
  const li = document.createElement("li");
  li.innerText = name + "님이 - " + msg;
  chatList.appendChild(li);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const msgForm = document.getElementById("msgForm");

  // 서버로 메시지를 전송한다.
  socket.emit("chat", { msg: msgForm.value });
  msgForm.value = "";
});

socket.on("chat", (data) => {
  const { name, userid } = data.from;
  const { msg } = data;

  const div = document.createElement("div");
  div.innerText = msg;
  chatList.appendChild(div);
});

sendButton.addEventListener("click", () => {
  //like fetch :  body
  const prams = { name: nickname.value, msg: chatInput.value };
  // 접속된 모든 클라이언트에게 메세지를 전송한다.
  socket.emit("chatting", prams);
});

socket.on("chatting", (data) => {
  //like fetch : get
  createChatList(data);
});

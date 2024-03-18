"use strict";

const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");

const createChatList = (data) => {
  const li = document.createElement("li");
  li.innerText = data.name + "님이 - " + data.msg;
  chatList.appendChild(li);
};

sendButton.addEventListener("click", () => {
  //like fetch :  body
  const prams = { name: nickname.value, msg: chatInput.value };
  socket.emit("chatting", prams);
});

socket.on("chatting", (data) => {
  //like fetch : get
  console.log("chat js:");
  createChatList(data);
});

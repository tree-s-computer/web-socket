"use strict";

const chat = io("/chat");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 서버로 자신의 정보를 전송한다.
  chat.emit("chat message", {
    name: document.getElementById("name").value,
    room: document.getElementById("room").value,
    msg: document.getElementById("msg").value,
  });
});

chat.on("chat message", (data) => {
  const chatElement = document.getElementById("chat");
  const listItem = document.createElement("li");
  const textNode = document.createTextNode(data);
  listItem.appendChild(textNode);
  chatElement.appendChild(listItem);
});

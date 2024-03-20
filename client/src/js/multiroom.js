let roomname = "채팅방 1";
const socket = io();
const msgform = document.getElementById("msgform");
const getUserForm = document.getElementById("getUserForm");
const roomsText = document.getElementById("rooms");
const usersText = document.getElementById("users");
// socket.on 함수로 서버에서 전달하는 신호를 수신

socket.on("usercount", (count) => {
  const userCounter = document.getElementById("usercount");
  userCounter.innerText = "현재 " + count + "명이 서버에 접속해있습니다.";
});

// 메시지 수신시 HTML에 메시지 내용 작성
socket.on("message", (msg) => {
  const messageList = document.getElementById("messages");
  const messageTag = document.createElement("li");
  messageTag.innerText = msg;
  messageList.appendChild(messageTag);
});

// 접속한 룸이 바뀌었을 때
socket.on("roomChanged", (joinedRoom) => {
  roomname = joinedRoom;
  const messageList = document.getElementById("messages");
  const messageTag = document.createElement("li");
  messageTag.innerText = joinedRoom + "에 접속했습니다.";
  messageList.appendChild(messageTag);
});

msgform.onsubmit = (e) => {
  e.preventDefault();
  const msginput = document.getElementById("msginput");

  // socket.emit으로 서버에 신호를 전달
  // 특정 룸에 메시지를 보내기 위해 룸의 이름을 같이 전송
  socket.emit("message", msginput.value, roomname);

  msginput.value = "";
};

function enableDebug() {
  // 방 목록 가져오기 버튼 클릭시
  // url을 지정해서 특정 네임스페이스를 들어갈 수 있다.
  const debug = io.connect("http://localhost:8080/debug");

  debug.emit("getRooms"); // getRooms 이벤트 호출

  debug.on("rooms", (rooms) => {
    // rooms 이벤트 발생
    // 룸 목록 업데이트
    roomsText.textContent = "";
    for (const room in rooms) {
      roomsText.innerHTML += room + "<br>";
    }
  });
}

function joinRoom() {
  // 방 접속 버튼 클릭시
  const roomOptions = document.getElementById("roomoptions");
  const roomToJoin = roomOptions.options[roomOptions.selectedIndex].value;

  // 서버에 룸 전환 신호를 발신
  socket.emit("joinRoom", roomname, roomToJoin);
}

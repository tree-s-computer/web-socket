# web-socket

웹소켓 프로토콜은 HTTP 와는 다른 통신 프로토콜로 웹 서버와 웹 브라우저가 서로 실시간 메세지를 교환하는 데에 사용된다.
웹소켓 연결을 맺기 위한 첫 번째 핸드셰이크를 주고받은 이후 지속적으로 연결이 유지되는 것이 특징이다.
매번 메세지 전송시에 새롭게 연결을 맺을 필요가 없어 빠르고 효율적이다.
웹소켓 프로토콜은 HTTP 와 동일하게 애플리케이션 계층에서 동작한다.

## 양방향 통신

데이터 송수신을 동시에 처리할 수 있는 방법.
통상적인 HTTP 통신은 client 가 요청을 보내는 경우에만 Server가 응답을 하는 단방향 통신이지만,
웹 소켓은 양방향 통신이 가능하다.

## Real Time Networking

웹 환경에서 연속된 데이터를 빠르게 노출하는 것.
ex. 채팅, 주식

# How Web Sockets Work

1. Opening Handshake : HTTP Upgrade request / HTTP 101 response
2. Data transfer : WS frame
3. Closing Handshake : CLose / Close Response

## Room

각 namespace 내에서 임의의 채널을 지정할 수 있다. 이를 room이라 하며 이를 통해 room에 join되어 있는 클라이언트 만의 데이터 송수신이 가능하게 된다.
즉 각 클라이언트는 socket을 가지게 되며 이 socket은 namespace를 가지고 각 namespace는 room을 가질 수 있다.

### ref

https://poiemaweb.com/nodejs-socketio

## 명령어

socket.connect(): 클라이언트 소켓을 서버에 연결
socket.disconnect(): 소켓 연결을 종료
socket.send(): 데이터를 연결된 상대방에게 보낸다.
socket.on('event', callback): 특정 이벤트가 발생했을 때 실행할 콜백 함수를 등록한다.
socket.emit('event', data): 클라이언트나 서버에서 이벤트를 발생시킵니다. 연결된 상대방에게 데이터를 보낼 수 있다.
socket.join(room): 클라이언트를 특정 룸에 조인시킨다.
socket.leave(room): 클라이언트를 특정 룸에서 나가게 한다.
socket.broadcast.emit('event', data): 연결된 다른 모든 클라이언트에게 이벤트를 발생시키고 데이터를 보낸다.
socket.rooms: 클라이언트가 현재 조인한 모든 룸의 리스트를 반환
socket.id: 소켓의 고유 식별자를 반환

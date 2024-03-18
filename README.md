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

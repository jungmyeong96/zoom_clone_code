const socket = new WebSocket(`ws://${window.location.host}`); //브라우저에서 지원하는 웹소켓
//localhost:3000 => window.location.host 모바일을 지원하기 위해 변경
//연결할 서버 소켓

socket.addEventListener("open", () => {
  console.log("Connected to Server V");
}); //server와 연결을 시작

socket.addEventListener("message", (message) => {
  console.log("Just got this: ", message, "from the server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server V");
}); //server와 연결을 시작

setTimeout(() => {
  socket.send("hello from the browser");
}, 10000);

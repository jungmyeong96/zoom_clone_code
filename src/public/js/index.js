const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message"); //html의 기능을 재정의

const socket = new WebSocket(`ws://${window.location.host}`); //브라우저에서 지원하는 웹소켓
//localhost:3000 => window.location.host 모바일을 지원하기 위해 변경
//연결할 서버 소켓

//소켓으로 보낸 메시지의 성격을 구분하기 위해 이벤트명을 작성
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
  // websocket API가 브라우저에서 제공하는 것이기 때문에, 환경을 유연하게 둬야함
  //응답을 받는 서버가 통일되지 않은 상태 즉, js서버가 아닐 수 있기에, string으로 보내야 처리가 가능
}

socket.addEventListener("open", () => {
  console.log("Connected to Server V");
}); //server와 연결을 시작

socket.addEventListener("message", (message) => {
  console.log(message);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected to Server V");
}); //server와 연결을 시작

function handleSubmit(event) {
  event.preventDefault(); //기본동작을 막아줌 행동 재정의
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value)); //입력한 값을 서버로 전송
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit); //버튼 초기화
nickForm.addEventListener("submit", handleNickSubmit);

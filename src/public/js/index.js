/**************************/
/*        WebRTC       */
/**************************/

const socket = io();

const myFace = document.getElementById("myFace"); //autoplay: 자동재생 , playsinline: 전체화면 방지
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
let myStream; //stream은 영상과 오디오의 혼합
let muted = false;
let cameraOff = false;

async function getMedia() {
  //navigator.mediaDevices.getUserMedia 라는 api를 통해 유저미디어 string전달
  try {
    //이 메서드 는 요청된 미디어 유형을 포함하는 트랙 을 생성하는 미디어 입력을 사용할 수 있는 권한을 사용자에게 요청
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    console.log(myStream);
    myFace.srcObject = myStream;
  } catch (e) {
    console.dir(e);
  }
}

getMedia();

function handleMuteClick() {
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}

function handleCameraClick() {
  if (!cameraOff) {
    cameraBtn.innerText = "Turn camera Off";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Turn camera On";
    cameraOff = false;
  }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
// const myFace = document.getElementById("myFace");
// const muteBtn = document.getElementById("mute");
// const cameraBtn = document.getElementById("camera");
// const camerasSelect = document.getElementById("cameras");
// const call = document.getElementById("call");

// call.hidden = true;

// let myStream;
// let muted = false;
// let cameraOff = false;
// let roomName;
// let myPeerConnection;
// let myDataChannel;

// async function getCameras() {
//   try {
//     const devices = await navigator.mediaDevices.enumerateDevices();
//     const cameras = devices.filter((device) => device.kind === "videoinput");
//     const currentCamera = myStream.getVideoTracks()[0];
//     cameras.forEach((camera) => {
//       const option = document.createElement("option");
//       option.value = camera.deviceId;
//       option.innerText = camera.label;
//       if (currentCamera.label === camera.label) {
//         option.selected = true;
//       }
//       camerasSelect.appendChild(option);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function getMedia(deviceId) {
//   const initialConstrains = {
//     audio: true,
//     video: { facingMode: "user" },
//   };
//   const cameraConstraints = {
//     audio: true,
//     video: { deviceId: { exact: deviceId } },
//   };
//   try {
//     myStream = await navigator.mediaDevices.getUserMedia(
//       deviceId ? cameraConstraints : initialConstrains
//     );
//     myFace.srcObject = myStream;
//     if (!deviceId) {
//       await getCameras();
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// function handleMuteClick() {
//   myStream
//     .getAudioTracks()
//     .forEach((track) => (track.enabled = !track.enabled));
//   if (!muted) {
//     muteBtn.innerText = "Unmute";
//     muted = true;
//   } else {
//     muteBtn.innerText = "Mute";
//     muted = false;
//   }
// }
// function handleCameraClick() {
//   myStream
//     .getVideoTracks()
//     .forEach((track) => (track.enabled = !track.enabled));
//   if (cameraOff) {
//     cameraBtn.innerText = "Turn Camera Off";
//     cameraOff = false;
//   } else {
//     cameraBtn.innerText = "Turn Camera On";
//     cameraOff = true;
//   }
// }

// async function handleCameraChange() {
//   await getMedia(camerasSelect.value);
//   if (myPeerConnection) {
//     const videoTrack = myStream.getVideoTracks()[0];
//     const videoSender = myPeerConnection
//       .getSenders()
//       .find((sender) => sender.track.kind === "video");
//     videoSender.replaceTrack(videoTrack);
//   }
// }

// muteBtn.addEventListener("click", handleMuteClick);
// cameraBtn.addEventListener("click", handleCameraClick);
// camerasSelect.addEventListener("input", handleCameraChange);

// // Welcome Form (join a room)

// const welcome = document.getElementById("welcome");
// const welcomeForm = welcome.querySelector("form");

// async function initCall() {
//   welcome.hidden = true;
//   call.hidden = false;
//   await getMedia();
//   makeConnection();
// }

// async function handleWelcomeSubmit(event) {
//   event.preventDefault();
//   const input = welcomeForm.querySelector("input");
//   await initCall();
//   socket.emit("join_room", input.value);
//   roomName = input.value;
//   input.value = "";
// }

// welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// // Socket Code

// socket.on("welcome", async () => {
//   myDataChannel = myPeerConnection.createDataChannel("chat");
//   myDataChannel.addEventListener("message", (event) => console.log(event.data));
//   console.log("made data channel");
//   const offer = await myPeerConnection.createOffer();
//   myPeerConnection.setLocalDescription(offer);
//   console.log("sent the offer");
//   socket.emit("offer", offer, roomName);
// });

// socket.on("offer", async (offer) => {
//   myPeerConnection.addEventListener("datachannel", (event) => {
//     myDataChannel = event.channel;
//     myDataChannel.addEventListener("message", (event) =>
//       console.log(event.data)
//     );
//   });
//   console.log("received the offer");
//   myPeerConnection.setRemoteDescription(offer);
//   const answer = await myPeerConnection.createAnswer();
//   myPeerConnection.setLocalDescription(answer);
//   socket.emit("answer", answer, roomName);
//   console.log("sent the answer");
// });

// socket.on("answer", (answer) => {
//   console.log("received the answer");
//   myPeerConnection.setRemoteDescription(answer);
// });

// socket.on("ice", (ice) => {
//   console.log("received candidate");
//   myPeerConnection.addIceCandidate(ice);
// });

// // RTC Code

// function makeConnection() {
//   myPeerConnection = new RTCPeerConnection({
//     iceServers: [
//       {
//         urls: [
//           "stun:stun.l.google.com:19302",
//           "stun:stun1.l.google.com:19302",
//           "stun:stun2.l.google.com:19302",
//           "stun:stun3.l.google.com:19302",
//           "stun:stun4.l.google.com:19302",
//         ],
//       },
//     ],
//   });
//   myPeerConnection.addEventListener("icecandidate", handleIce);
//   myPeerConnection.addEventListener("addstream", handleAddStream);
//   myStream
//     .getTracks()
//     .forEach((track) => myPeerConnection.addTrack(track, myStream));
// }

// function handleIce(data) {
//   console.log("sent candidate");
//   socket.emit("ice", data.candidate, roomName);
// }

// function handleAddStream(data) {
//   const peerFace = document.getElementById("peerFace");
//   peerFace.srcObject = data.stream;
// }

/**************************/
/*        SocektIO        */
/**************************/
// const socket = io();

// const welcome = document.getElementById("welcome");
// const form = welcome.querySelector("form");
// const room = document.getElementById("room");

// room.hidden = true;

// let roomName;

// function addMessage(message) {
//   const ul = room.querySelector("ul");
//   const li = document.createElement("li");
//   li.innerText = message;
//   ul.appendChild(li);
// }

// function handleMessageSubmit(event) {
//   event.preventDefault();
//   const input = room.querySelector("#msg input");
//   const value = input.value;
//   socket.emit("new_message", input.value, roomName, () => {
//     addMessage(`You: ${value}`);
//   });
//   input.value = "";
// }

// function showRoom() {
//   welcome.hidden = true;
//   room.hidden = false;
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName}`;
//   const msgForm = room.querySelector("#msg");
//   msgForm.addEventListener("submit", handleMessageSubmit);
// }

// function handleRoomSubmit(event) {
//   event.preventDefault();
//   const input = form.querySelector("input");
//   socket.emit("enter_room", input.value, showRoom);
//   roomName = input.value;
//   input.value = "";
// }

// form.addEventListener("submit", handleRoomSubmit);

// socket.on("welcome", (user, newCount) => {
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${user} arrived!`);
// });

// socket.on("bye", (left, newCount) => {
//   const h3 = room.querySelector("h3");
//   h3.innerText = `Room ${roomName} (${newCount})`;
//   addMessage(`${left} left ㅠㅠ`);
// });

// socket.on("new_message", addMessage);

// socket.on("room_change", (rooms) => {
//   const roomList = welcome.querySelector("ul");
//   roomList.innerHTML = "";
//   if (rooms.length === 0) {
//     return;
//   }
//   rooms.forEach((room) => {
//     const li = document.createElement("li");
//     li.innerHTML = room;
//     roomList.append(li);
//   });
// });

/**************************/
/*        Websocket       */
/**************************/
// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message"); //html의 기능을 재정의
// const socket = new WebSocket(`ws\://${window.location.host}`); //브라우저에서 지원하는 웹소켓
// //localhost:3000 => window.location.host 모바일을 지원하기 위해 변경
// //연결할 서버 소켓
// //소켓으로 보낸 메시지의 성격을 구분하기 위해 이벤트명을 작성
// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
//   // websocket API가 브라우저에서 제공하는 것이기 때문에, 환경을 유연하게 둬야함
//   //응답을 받는 서버가 통일되지 않은 상태 즉, js서버가 아닐 수 있기에, string으로 보내야 처리가 가능
// }
// socket.addEventListener("open", () => {
//   console.log("Connected to Server V");
// }); //server와 연결을 시작
// socket.addEventListener("message", (message) => {
//   console.log(message);
//   const li = document.createElement("li");
//   li.innerText = message.data;
//   messageList.append(li);
// });
// socket.addEventListener("close", () => {
//   console.log("Disconnected to Server V");
// }); //server와 연결을 시작
// function handleSubmit(event) {
//   event.preventDefault(); //기본동작을 막아줌 행동 재정의
//   const input = messageForm.querySelector("input");
//   socket.send(makeMessage("new_message", input.value)); //입력한 값을 서버로 전송
//   input.value = "";
// }
// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value));
//   input.value = "";
// }
// messageForm.addEventListener("submit", handleSubmit); //버튼 초기화
// nickForm.addEventListener("submit", handleNickSubmit);

import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //템플릿 엔진 설정작업
app.use("/public", express.static(__dirname + "/public")); //유저가 볼 수 있는 범위 설정
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log("listening on http://localhost:3000");

// app.listen(3000, handleListen);
//express환경에서 http와 ws를 둘다 돌리는 작업
//필수사항은 아님 여기서는 동일한 포트에서 두가지 작업을 처리하기 위해 설정
const server = http.createServer(app); //ws를 쓰기위해 express로부터 http서버를 생성
const wss = new WebSocket.Server({ server }); //브라우저와 서버의 연결
//브라우저 상에서 websocket의 open이벤트로 감지가능

//socket은 누군가와 연결될지 판단하는 연락망
//wss의 connection 이벤트 감지
wss.on("connection", (socket) => {
  console.log("Connected to Browser V");
  socket.on("close", () => console.log("Disconnected from browser X")); //브라우저와의 연결이 끊어지는 이벤트체크
  socket.on("message", (message) => console.log(message.toString("utf8"))); //브라우저로부터 받는 메시지
  socket.send("hello!"); //소켓 고유의 send메시지로 브라우저에게 메시지 송신
});
//브라우저와 연결된 소켓

server.listen(3000, handleListen);

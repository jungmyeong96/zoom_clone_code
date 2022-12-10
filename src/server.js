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
const server = http.createServer(app); //ws를 쓰기위해 express로 부터 http서버를 생성
const wss = new WebSocket.Server({ server });

server.listen(3000, handleListen);

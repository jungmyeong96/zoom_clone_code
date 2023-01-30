/**************************/
/*        WebRTC        */
/**************************/

import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //템플릿 엔진 설정작업
app.use("/public", express.static(__dirname + "/public")); //유저가 볼 수 있는 범위 설정
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

// wsServer.on("connection", (socket) => {
//   socket.on("join_room", (roomName) => {
//     socket.join(roomName);
//     socket.to(roomName).emit("welcome");
//   });
//   socket.on("offer", (offer, roomName) => {
//     socket.to(roomName).emit("offer", offer);
//   });
//   socket.on("answer", (answer, roomName) => {
//     socket.to(roomName).emit("answer", answer);
//   });
//   socket.on("ice", (ice, roomName) => {
//     socket.to(roomName).emit("ice", ice);
//   });
// });

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

/**************************/
/*        SocektIO        */
/**************************/

// import http from "http";
// import { Server } from "socket.io";
// import { instrument } from "@socket.io/admin-ui";
// import express from "express";

// const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/", (_, res) => res.render("home"));
// app.get("/*", (_, res) => res.redirect("/"));

// const httpServer = http.createServer(app);
// const wsServer = new Server(httpServer, {
//   cors: {
//     origin: ["https://admin.socket.io"],
//     credentials: true,
//   },
// });

// instrument(wsServer, {
//   auth: false,
// });

// function publicRooms() {
//   const {
//     sockets: {
//       adapter: { sids, rooms },
//     },
//   } = wsServer;
//   const publicRooms = [];
//   rooms.forEach((_, key) => {
//     if (sids.get(key) === undefined) {
//       publicRooms.push(key);
//     }
//   });z
//   return publicRooms;
// }

// function countRoom(roomName) {
//   return wsServer.sockets.adapter.rooms.get(roomName)?.size;
// }

// wsServer.on("connection", (socket) => {
//   socket["nickname"] = "Anon";
//   socket.onAny((event) => {
//     console.log(`Socket Event: ${event}`);
//   });
//   socket.on("enter_room", (roomName, done) => {
//     socket.join(roomName);
//     done();
//     socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
//     wsServer.sockets.emit("room_change", publicRooms());
//   });
//   socket.on("disconnecting", () => {
//     socket.rooms.forEach((room) =>
//       socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1)
//     );
//   });
//   socket.on("disconnect", () => {
//     wsServer.sockets.emit("room_change", publicRooms());
//   });
//   socket.on("new_message", (msg, room, done) => {
//     socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//     done();
//   });
//   socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
// });

// const handleListen = () => console.log(`Listening on http://localhost:3000`);
// httpServer.listen(3000, handleListen);

/**************************/
/*         Websocket      */
/**************************/

// import http from "http";
// import WebSocket from "ws";
// import express from "express";

// //소켓 IO추가할것

// const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname + "/views"); //템플릿 엔진 설정작업
// app.use("/public", express.static(__dirname + "/public")); //유저가 볼 수 있는 범위 설정
// app.get("/", (req, res) => res.render("home"));
// app.get("/*", (req, res) => res.redirect("/"));

// const handleListen = () => console.log("listening on http://localhost:3000");

// // app.listen(3000, handleListen);
// //express환경에서 http와 ws를 둘다 돌리는 작업
// //필수사항은 아님 여기서는 동일한 포트에서 두가지 작업을 처리하기 위해 설정
// const server = http.createServer(app); //ws를 쓰기위해 express로부터 http서버를 생성
// const wss = new WebSocket.Server({ server }); //브라우저와 서버의 연결
// //브라우저 상에서 websocket의 open이벤트로 감지가능

// //socket은 누군가와 연결될지 판단하는 연락망
// //wss의 connection 이벤트 감지

// const sockets = []; //서버와 연결된 브라우저 소켓들

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon"; //닉네임 초기화
//   console.log("Connected to Browser V");
//   socket.on("close", () => console.log("Disconnected from browser X")); //브라우저와의 연결이 끊어지는 이벤트체크
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg); //string을 다시 객체화

//     switch (message.type) {
//       case "new_message": //타입에 따라 메시지처리
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;
//       case "nickname": //타입에 따라 닉네임처리
//         socket["nickname"] = message.payload; //소켓 객체에 닉네임을 추가
//         break;
//     }
//   });
// });
// //브라우저와 연결된 소켓

// server.listen(3000, handleListen);

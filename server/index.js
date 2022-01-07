const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../build", "index.html"));
});

io.on("connection", (socket) => {
  socket.join("1");
  socket.on("message", ({ name, msg, roomCode }) => {
    io.to(roomCode).emit("message", { name, msg });
    console.log("Sent message to", roomCode);
  });
  socket.on("join", (roomCode, prevRoomCode) => {
    if (roomCode !== prevRoomCode) {
      socket.leave(prevRoomCode);
      socket.join(roomCode);
    }
    console.log("Joined Room:", roomCode, "Left Room:", prevRoomCode);
  });
});

server.listen(port, () => {
  console.log("Listening on port:", port);
});

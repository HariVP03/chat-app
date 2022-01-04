const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket) => {
  socket.on("message", ({ name, msg }) => {
    io.emit("message", { name, msg });
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

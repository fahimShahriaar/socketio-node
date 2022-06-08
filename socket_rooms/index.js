const http = require("http");
const express = require("express");
const app = express();

const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", function (socket) {
  console.log("New user connected");

  // Room
  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleep", "I'm sleeping...");

  socket.join("kitchen");
  const kitchenMember = io.sockets.adapter.rooms.get("kitchen").size;
  io.sockets
    .in("kitchen")
    .emit(
      "cooking",
      `I'm cooking... ${kitchenMember} people present in the kitchen`
    );

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(7000, () => {
  console.log("Server is running on port 7000");
});

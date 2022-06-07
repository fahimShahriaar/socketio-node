const http = require("http");
const express = require("express");
const app = express();

const expressServer = http.createServer(app);
// initialize socket connection
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("new user connected");

  socket.on("chatMessage", (message) => {
    console.log(message);
    io.emit("chatMessageToClient", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(5000, () => {
  console.log("Server running on port 5000");
});

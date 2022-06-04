const http = require("http");
const express = require("express");
const app = express();

const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => {
  console.log("Server running on port 3000");
});

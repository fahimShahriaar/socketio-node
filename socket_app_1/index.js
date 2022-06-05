const http = require("http");
const express = require("express");
const app = express();

const { color, log } = require("console-log-colors");
const { red, green, cyan } = color;

const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

io.on("connection", (socket) => {
  log.white(color.greenBG("User Connected..."));

  setInterval(() => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    socket.send(`Welcome to the chat room! ${time}`);
  }, 100);

  setInterval(() => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    socket.emit("privateMessage", time);
  }, 100);

  socket.on("message", (message) => {
    console.log(`${message}`);
  });

  socket.on("myEvent", (message) => {
    console.log("myEvent");
    console.log(`${message}`);
  });

  socket.on("disconnect", () => {
    log.white(color.redBG("User Disconnected..."));
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => {
  console.log("Server running on port 3000");
});

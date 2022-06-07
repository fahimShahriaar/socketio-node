const http = require("http");
const express = require("express");
const app = express();

const { color, log } = require("console-log-colors");
const { red, green, cyan } = color;

const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

// Broadcast to all clients
// io.on("connection", (socket) => {
//   log.white(color.greenBG("User Connected..."));

//   io.sockets.emit("broadcastEvent", "Welcome to the chat room!");

//   socket.on("disconnect", () => {
//     log.white(color.redBG("User Disconnected..."));
//   });
// });

const buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
  log.green(color.bgWhiteBright("User Connected..."));
  buyNsp.emit("myEvent", "Hello buy namespace!");
});

const sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
  log.black(color.bgCyanBright("User Connected..."));
  sellNsp.emit("myEvent", "Hello sell namespace!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/server1.html");
});

expressServer.listen(5000, () => {
  console.log("Server running on port 5000");
});

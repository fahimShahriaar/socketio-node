const http = require("http");
const express = require("express");
const app = express();

const expressServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(expressServer);

const buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
  buyNsp.emit("myEvent", "Broadcasting for buy!");
});

const sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
  sellNsp.emit("myEvent", "Broadcasting for sell!");
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/server2.html");
});

expressServer.listen("5000", () => {
  console.log("Server running on port 5000");
});

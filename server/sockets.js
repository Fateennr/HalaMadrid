// server/sockets.js
const { Server } = require("socket.io");

function initSockets(server) {
  // allow CORS from any origin (adjust in production!)
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", socket => {
    console.log("🟢 socket connected:", socket.id);

    // join everybody to the same “fan-zone” room
    socket.join("fan-zone");

    // relay incoming chat messages to everyone in room
    socket.on("chat", msg => {
      // msg should be { author, content, time }
      io.to("fan-zone").emit("chat", msg);
    });

    socket.on("disconnect", () => {
      console.log("🔴 socket disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = initSockets;

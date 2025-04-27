const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    socket.on("message", (msg) => {
      io.emit("message", `${socket.id.substr(0, 2)} said ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
    });
  });
};

module.exports = handleSocketConnection;

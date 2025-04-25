const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', socket => {
  console.log('user connected', socket.id);

  socket.on('message', message => {
    console.log('received:', message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

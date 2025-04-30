const { Server } = require('socket.io');
const Chat = require('./models/chat.model');

function initSockets(server) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', async socket => {
    // send existing history to this client
    const history = await Chat.find()
      .sort({ createdAt: 1 })
      .populate('author', 'username');
    socket.emit('chat-history', history);

    socket.on('chat', async msg => {
      // msg: { userId, content }
      const chat = await Chat.create({ author: msg.userId, content: msg.content });
      const populated = await chat.populate('author', 'username');
      io.to('fan-zone').emit('chat', populated);
    });

    socket.join('fan-zone');
    socket.on('disconnect', () => {});
  });

  return io;
}

module.exports = initSockets;

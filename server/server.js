// server.js
require("dotenv").config();

const http        = require("http");
const app         = require("./app");
const connectDB   = require("./config/db");
const initSockets = require("./sockets");

(async () => {
  await connectDB();

  // create HTTP server from your Express app
  const server = http.createServer(app);

  // initialize Socket.IO on that server
  const io = initSockets(server);

  const PORT = process.env.PORT || 8081;
  server.listen(PORT, () => {
    console.log(`Server live on http://localhost:${PORT}`);
  });
})();

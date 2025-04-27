const http      = require("http");
const app       = require("./app");
const connectDB = require("./config/db");

(async () => {
  await connectDB();
  const server = http.createServer(app);
  const PORT   = process.env.PORT || 8081;
  server.listen(PORT, () => {
    console.log(`Server live on http://localhost:${PORT}`);
  });
})();

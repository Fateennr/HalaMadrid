// server/index.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// ——— MONGODB SETUP ———
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Squad schema & model
const playerSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  position:  String,
  number:    Number,
  nationality: String,
  age:       Number,
});
const Player = mongoose.model("Player", playerSchema);

// ——— REST ENDPOINT to fetch squad ———
app.get("/api/squad", async (req, res) => {
  try {
    const squad = await Player.find().sort({ number: 1 });
    res.json(squad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ——— Socket.IO (your existing chat) ———
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("message", (msg) => {
    io.emit("message", `${socket.id.substr(0, 2)} said ${msg}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = 8081;
server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsR = require("./routes/news");
const matchR = require("./routes/matches");
const squadR = require("./routes/squad");
const authRoutes = require("./routes/auth");
const fanZoneR = require("./routes/fanZone"); // Import the fan zone route

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/news", newsR);
app.use("/api/matches", matchR);
app.use("/api/squad", squadR);
// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/fan-zone", fanZoneR); // Add the fan zone route

module.exports = app;

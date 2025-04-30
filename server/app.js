require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsR = require("./routes/news");
const matchR = require("./routes/matches");
const squadR = require("./routes/squad");
const authRoutes = require("./routes/auth");
const fanzoneRoutes = require("./routes/posts.routes"); 

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/news", newsR);
app.use("/api/matches", matchR);
app.use("/api/squad", squadR);
// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/fanzone", fanzoneRoutes); 

module.exports = app;

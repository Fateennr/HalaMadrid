require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const newsR    = require("./routes/news");
const matchR  = require("./routes/matches");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/news", newsR);
app.use("/api/matches", matchR)

module.exports = app;

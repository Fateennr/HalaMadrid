require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const newsR    = require("./routes/news");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/news", newsR);

module.exports = app;

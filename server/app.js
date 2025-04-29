require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const newsR    = require("./routes/news");
const matchR   = require("./routes/matches");
const squadR   = require("./routes/squad"); 
const playerR = require("./routes/players");   

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/news", newsR);
app.use("/api/matches", matchR);
app.use("/api/squad", squadR);  
app.use("/api/players", playerR);  




module.exports = app;

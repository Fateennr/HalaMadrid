require("dotenv").config();
const express = require("express");
const cors = require("cors");
const newsR = require("./routes/news");
const matchR = require("./routes/matches");
const squadR = require("./routes/squad");
const authRoutes = require("./routes/auth");
const fanzoneRoutes = require("./routes/posts.routes"); 
const legendsRoutes = require("./routes/legends");





const app = express();

// Increase payload size limits
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use("/api/news", newsR);
app.use("/api/matches", matchR);
app.use("/api/squad", squadR);
// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/fanzone", fanzoneRoutes); 
app.use("/api/legends", legendsRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof SyntaxError && err.status === 413) {
    return res.status(413).json({ error: 'File too large' });
  }
  res.status(500).json({ error: 'Something broke!' });
});

module.exports = app;

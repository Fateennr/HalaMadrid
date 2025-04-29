// server/routes/players.js
const express                = require("express");
const fetchPlayerStatsByName = require("../config/playerStatsApi");
const router                 = express.Router();

router.get("/stats", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: "Missing name query" });

  try {
    const stats = await fetchPlayerStatsByName(String(name));
    res.json(stats);
  } catch (err) {
    console.error("Stats API error:", err.message);
    res.status(500).json({ error: "Unable to load player stats" });
  }
});

module.exports = router;

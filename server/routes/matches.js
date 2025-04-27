// server/routes/matches.js
const express       = require("express");
const fetchMatches  = require("../config/matchApi");
const router        = express.Router();

router.get("/", async (req, res) => {
  try {
    const raw = await fetchMatches();
    // Map to the shape your front-end expects
    const matches = raw.map(m => ({
      date:      m.utcDate,
      competition: m.competition.name,
      home:      m.homeTeam.name,
      away:      m.awayTeam.name,
      homeLogo:  m.homeTeam.crest, // SVG/PNG URL
      awayLogo:  m.awayTeam.crest,
      venue:     m.venue || "TBD",
    }));
    res.json(matches);
  } catch (err) {
    console.error("MatchAPI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch upcoming matches" });
  }
});

module.exports = router;

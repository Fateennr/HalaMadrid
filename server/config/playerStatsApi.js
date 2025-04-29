// server/config/playerStatsApi.js
require("dotenv").config();
const axios = require("axios");

const KEY    = process.env.FOOTBALL_KEY;      // your API-Football key
const LEAGUE = 140;   // e.g. "140" for La Liga
const SEASON = 2023;   // e.g. "2024"
const TEAM   = 86;  // e.g. "86" for Real Madrid
const BASE   = "https://v3.football.api-sports.io";

if (!KEY || !LEAGUE || !SEASON || !TEAM) {
  console.error(
    "Missing one of FOOTBALL_KEY / FOOTBALL_LEAGUE / FOOTBALL_SEASON / FOOTBALL_TEAM_ID in .env"
  );
  process.exit(1);
}

/**
 * Fetch stats for `playerName`, scanning through all pages of the squad.
 */
async function fetchPlayerStatsByName(playerName) {
  const headers = { "x-apisports-key": KEY };

  // 1) Fetch page 1 to learn how many pages there are
  const firstRes = await axios.get(`${BASE}/players`, {
    params: { league: LEAGUE, season: SEASON, team: TEAM, page: 1 },
    headers,
  });

  const totalPages = firstRes.data.paging?.total || 1;

  // 2) Loop through each page until we find the player
  for (let page = 1; page <= totalPages; page++) {
    const res = page === 1
      ? firstRes
      : await axios.get(`${BASE}/players`, {
          params: { league: LEAGUE, season: SEASON, team: TEAM, page },
          headers,
        });

    const players = res.data.response || [];
    const entry = players.find(e =>
      e.player.name.toLowerCase().includes(playerName.toLowerCase())
    );

    if (entry) {
      const s = entry.statistics[0] || {};
      return {
        appearances:  s.games?.appearances  ?? 0,
        goals:        s.goals?.total        ?? 0,
        assists:      s.goals?.assists      ?? 0,
        cleanSheets:  s.games?.position === "Goalkeeper"
                         ? (s.goals?.saves  ?? 0)
                         : (s.cleanSheet   ?? 0),
        yellowCards:  s.cards?.yellow       ?? 0,
        redCards:     s.cards?.red          ?? 0,
      };
    }
  }

  // 3) If we never found the player
  throw new Error("No stats found for player " + playerName);
}

module.exports = fetchPlayerStatsByName;

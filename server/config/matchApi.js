// server/config/matchApi.js
const axios = require("axios");
const BASE  = "https://api.football-data.org/v4";
const TOKEN = process.env.FOOTBALL_DATA_TOKEN;

if (!TOKEN) {
  console.error("❌ FOOTBALL_DATA_TOKEN missing in .env");
  process.exit(1);
}

// Real Madrid’s team ID in Football-Data.org v4 is 86
const TEAM_ID = 86;

async function fetchUpcomingMatches() {
  const res = await axios.get(`${BASE}/teams/${TEAM_ID}/matches`, {
    params: { status: "SCHEDULED" },
    headers: { "X-Auth-Token": TOKEN },
  });
  // res.data.matches is an array of upcoming fixtures
  return res.data.matches;
}

module.exports = fetchUpcomingMatches;

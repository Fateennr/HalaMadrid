// server/config/newsApi.js
const axios = require("axios");
const BASE_URL = "https://newsapi.org/v2/everything";
const KEY      = process.env.NEWS_API_KEY;

if (!KEY) {
  console.error("Missing NEWS_API_KEY in .env");
  process.exit(1);
}

/**
 * Fetches the latest articles matching a query.
 * @param {Object} opts
 * @param {string} opts.q         Search term (default: "Real Madrid")
 * @param {string} opts.language  Article language (default: "en")
 * @param {number} opts.pageSize  Number of articles (default: 12)
 */
async function fetchLatestNews({
  q        = "Real Madrid",
  language = "en",
  pageSize = 12,
} = {}) {
  const response = await axios.get(BASE_URL, {
    params: {
      apiKey: KEY,
      q,
      language,
      sortBy: "publishedAt",
      pageSize,
    },
  });
  return response.data.articles; // array of { title, description, urlToImage, publishedAt, url, … }
}

module.exports = fetchLatestNews;

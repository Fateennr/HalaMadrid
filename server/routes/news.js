const express       = require("express");
const fetchLatest   = require("../config/newsApi");
const router        = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q, country, category } = req.query;
    const articles = await fetchLatest({ q, country, category });
    // map to our front-end model
    const news = articles.map(a => ({
      title:    a.title,
      summary:  a.description,
      imageUrl: a.urlToImage,
      date:     a.publishedAt,
      url:      a.url
    }));
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch live news" });
  }
});

module.exports = router;

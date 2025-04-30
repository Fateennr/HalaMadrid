const express = require("express");
const Legend = require("../models/Legend");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const legends = await Legend.find().sort({ name: 1 });
    res.json(legends);
  } catch (err) {
    console.error("Error fetching legends:", err);
    res.status(500).json({ error: "Failed to fetch legends" });
  }
});

module.exports = router;
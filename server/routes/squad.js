const express = require("express");
const Player = require("../models/Player");

const router = express.Router();

// GET /api/squad
router.get("/", async (req, res) => {
  try {
    const squad = await Player.find().sort({ number: 1 });
    res.json(squad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

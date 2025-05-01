const express = require("express");
const Player = require("../models/Player");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const squad = await Player.find().sort({ number: 1 });
    res.json(squad);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    console.error("Create error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPlayer = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPlayer) return res.status(404).json({ error: "Player not found" });
    res.json(updatedPlayer);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Player not found" });
    res.json({ message: "Player deleted", player: deleted });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

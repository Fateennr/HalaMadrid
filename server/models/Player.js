const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  number: Number,
  nationality: String,
  age: Number,
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;

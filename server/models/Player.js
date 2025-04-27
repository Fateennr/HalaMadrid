const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  number: Number,
  nationality: String,
  age: Number,
  imageLink: String,
});


const Player = mongoose.model("Player", playerSchema, "players");

module.exports = Player;

const mongoose = require("mongoose");

const legendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  years: { type: String, required: true },
  position: { type: String, required: true },
  image: { type: String, required: true },
  achievements: [{ type: String }],
  bio: { type: String, required: true },
  quote: { type: String, required: true }
});

const Legend = mongoose.model("Legend", legendSchema);

module.exports = Legend;
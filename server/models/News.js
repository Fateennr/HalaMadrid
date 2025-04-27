// add `summary` and `imageUrl`
const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  summary:  { type: String, required: true },
  content:  { type: String },
  imageUrl: { type: String, required: true },
  date:     { type: Date,   required: true, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);

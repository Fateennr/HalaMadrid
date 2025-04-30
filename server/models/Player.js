const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  role: {
    type: String,
    enum: ['Forward', 'Midfielder', 'Defender', 'Goalkeeper'],
    required: true,
  },
  number: Number,
  nationality: String,
  age: Number,
  imageLink: String,
  appearances: Number,
  overall: { type: Number, default: 90 },

  stats: {
    type: Map,
    of: Number,
    default: {},
  },
});

const roleStats = {
  Forward: ["pace", "shooting", "dribbling", "finishing", "composure", "offPosition"],
  Midfielder: ["passing", "vision", "ballControl", "longShots", "creativity", "workRate"],
  Defender: ["defending", "physicality", "heading", "tackling", "marking", "interceptions"],
  Goalkeeper: ["diving", "handling", "kicking", "reflexes", "speed", "positioning"],
};

playerSchema.pre("save", function (next) {
  const allowedKeys = roleStats[this.role] || [];
  const statKeys = Array.from(this.stats?.keys?.() || []);
  const invalidKeys = statKeys.filter((k) => !allowedKeys.includes(k));

  if (invalidKeys.length > 0) {
    return next(new Error(`Invalid stats for role "${this.role}": ${invalidKeys.join(", ")}`));
  }

  next();
});

const Player = mongoose.model("Player", playerSchema, "players");

module.exports = Player;




    // //forward
    // pace: 96,
    // shooting: 89,
    // dribbling: 92,
    // finishing: 90,
    // composure: 88,
    // offPosition: 91,

    // //midfielder
    // pace: 95,
    // shooting: 84,
    // dribbling: 93,
    // finishing: 85,
    // composure: 86,
    // offPosition: 87,


    // // defender
    // defending: 88,
    // physicality: 90,
    // heading: 87,
    // tackling: 89,
    // marking: 86,
    // interceptions: 85,


    // //goalkeeper
    // diving: 89,
    // handling: 91,
    // kicking: 85,
    // reflexes: 92,
    // speed: 78,
    // positioning: 90,

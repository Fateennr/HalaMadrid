require("dotenv").config();
const mongoose = require("mongoose");
const News     = require("./models/News");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  // wipe & re-seed
  await News.deleteMany({});
  await News.insertMany([
    {
      title:    "Real Madrid clinch 35th La Liga crown",
      summary:  "A late winner by Benzema sealed the title in dramatic fashion.",
      imageUrl: "https://via.placeholder.com/1200x600?text=La+Liga+Winners",
      date:     "2023-05-20"
    },
    {
      title:    "Benzema nets hat-trick to power through Champions League",
      summary:  "Three goals in the return leg see Los Blancos storm into the semis.",
      imageUrl: "https://via.placeholder.com/1200x600?text=Champions+League+Hat-trick",
      date:     "2023-04-15"
    },
    {
      title:    "New signing announced for upcoming season",
      summary:  "Club confirm €100m deal for teenage sensation from PSG academy.",
      imageUrl: "https://via.placeholder.com/1200x600?text=New+Signing",
      date:     "2023-06-01"
    },
  ]);

  console.log("News collection seeded");
  mongoose.disconnect();
}

seed().catch(console.error);

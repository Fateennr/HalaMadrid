require("dotenv").config();
const mongoose = require("mongoose");
const Legend = require("../models/Legend");

const legends = [
  {
    name: "Alfredo Di Stéfano",
    nickname: "Saeta Rubia (Blond Arrow)",
    years: "1953-1964",
    position: "Forward",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Alfredo_Di_St%C3%A9fano_%281953%29.jpg",
    achievements: [
      "5x European Cup",
      "8x La Liga",
      "2x Ballon d'Or",
      "308 goals in 396 appearances",
      "Real Madrid's Honorary President"
    ],
    bio: "Alfredo Di Stéfano was the most complete footballer in history, instrumental in transforming Real Madrid into Europe's most successful club. His influence on the game was profound, combining extraordinary vision, stamina, and skill.",
    quote: "Real Madrid is like a life-giving force, a religion that unites millions of people around the world."
  },
  {
    name: "Ferenc Puskás",
    nickname: "The Galloping Major",
    years: "1958-1966",
    position: "Forward",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Puskas_Ferenc_1963.jpg",
    achievements: [
      "3x European Cup",
      "5x La Liga",
      "4x Pichichi Trophy",
      "242 goals in 262 appearances",
      "FIFA Puskás Award named in his honor"
    ],
    bio: "Ferenc Puskás was one of the most prolific forwards in football history. After joining Real Madrid at 31, he formed an unstoppable partnership with Di Stéfano, proving age was just a number with his incredible left foot.",
    quote: "When we attack, everyone attacks. When we defend, everyone defends."
  },
  {
    name: "Raúl González",
    nickname: "El Siete (The Seven)",
    years: "1994-2010",
    position: "Forward",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Ra%C3%BAl_Bernab%C3%A9u.jpg",
    achievements: [
      "3x UEFA Champions League",
      "6x La Liga",
      "2x Pichichi Trophy",
      "323 goals in 741 appearances",
      "Real Madrid's all-time leading appearance maker"
    ],
    bio: "Raúl embodied the values of Real Madrid like few others. A product of La Fábrica, he became captain and an icon of Madridismo, known for his leadership, clinical finishing, and iconic goal celebrations.",
    quote: "Being a Real Madrid player is the pinnacle for any footballer."
  },
  {
    name: "Cristiano Ronaldo",
    nickname: "CR7",
    years: "2009-2018",
    position: "Forward",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg",
    achievements: [
      "4x UEFA Champions League",
      "2x La Liga",
      "4x Ballon d'Or at Madrid",
      "450 goals in 438 appearances",
      "Real Madrid's all-time top scorer"
    ],
    bio: "Cristiano Ronaldo redefined excellence at Real Madrid, breaking numerous records and achieving unprecedented success. His dedication, athleticism, and goal-scoring prowess made him one of the greatest players in football history.",
    quote: "I am living a dream I never want to wake up from."
  },
  {
    name: "Zinedine Zidane",
    nickname: "Zizou",
    years: "2001-2006",
    position: "Midfielder",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Zinedine_Zidane_by_Tasnim_03.jpg",
    achievements: [
      "1x UEFA Champions League",
      "1x La Liga",
      "1x Ballon d'Or",
      "49 goals in 227 appearances",
      "3x Champions League as manager"
    ],
    bio: "Zinedine Zidane brought elegance and artistry to football. His volley in the 2002 Champions League final remains one of the greatest goals ever scored. Later returned to win three consecutive Champions League titles as manager.",
    quote: "Real Madrid is the best club in the world. It demands the best of you."
  }
];

async function seedLegends() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");

    // Clear existing legends
    await Legend.deleteMany({});
    console.log("Cleared existing legends");

    // Insert new legends
    await Legend.insertMany(legends);
    console.log("Inserted new legends successfully");

    // Verify insertion
    const count = await Legend.countDocuments();
    console.log(`Successfully seeded ${count} legends`);

    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding legends:", err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedLegends();
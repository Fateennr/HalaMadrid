const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware to protect the route

const router = express.Router();

// Mock data for fan zone posts
const posts = [
  {
    id: "1",
    avatar: "/placeholder.svg",
    author: "MadridFan1902",
    time: "2 hours ago",
    content: "What an incredible victory last night! Hala Madrid!",
    image: "/placeholder.svg",
    isLiked: false,
    likes: 245,
    comments: 12,
  },
  {
    id: "2",
    avatar: "/placeholder.svg",
    author: "HalaMadrid",
    time: "5 hours ago",
    content: "Who do you think we should sign next season?",
    image: null,
    isLiked: true,
    likes: 178,
    comments: 34,
  },
];

// GET /api/fan-zone
router.get("/", authMiddleware, (req, res) => {
  try {
    res.json(posts); // Return the mock posts
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
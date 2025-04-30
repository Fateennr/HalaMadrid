const express = require("express");
const multer  = require("multer");
const { Types } = require("mongoose");
const jwt = require("jsonwebtoken");
const PostService = require("../services/posts.services");

const router = express.Router();

// Increase the payload size limit
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

// → configure multer to save to server/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // keep original extension
    const ext = file.originalname.split(".").pop();
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e6)}.${ext}`);
  },
});
const upload = multer({ storage });

// Create a post (multipart/form-data)
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const { content, image, avatar } = req.body;
    
    // Get user ID from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const authorId = decoded.id;

    const post = await PostService.createPost({
      authorId,
      avatar,
      content,
      image // This will be the base64 string
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/feed", async (req, res) => {
  try {
    const posts = await PostService.getFeedPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:postId/like", async (req, res) => {
  try {
    const post = await PostService.likePost(req.params.postId);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// …other routes (user/:userId, update, delete) remain unchanged

module.exports = router;

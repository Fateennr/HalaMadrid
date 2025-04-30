const express = require("express");
const multer  = require("multer");
const { Types } = require("mongoose");
const PostService = require("../services/posts.services");

const router = express.Router();

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
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { authorId, avatar, content } = req.body;
    // if multer saved a file, req.file is set
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await PostService.createPost({
      authorId,
      avatar,
      content,
      image: imagePath,
    });
    res.status(201).json(post);
  } catch (err) {
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

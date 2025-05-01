const express = require('express');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const PostService = require('../services/posts.services.js');




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
})


router.get('/feed', async (req, res) => {
  try {
    const posts = await PostService.getFeedPosts();
    console.log('posts are ', posts);
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await PostService.getPostsByUser(req.params.userId)
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// to like the post 
router.put('/:postId/like', async (req, res) => {
  try {
    const post = await PostService.likePost(req.params.postId)
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.put('/:postId', async (req, res) => {
  try {
    const updates = {
      content: req.body.content,
      image:   req.body.image,
    }
    const post = await PostService.updatePost(req.params.postId, updates)
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.delete('/:postId', async (req, res) => {
  try {
    await PostService.deletePost(req.params.postId)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router;


// const posts = [
//   {
//     id: "1",
//     avatar: "/placeholder.svg",
//     author: "MadridFan1902",
//     time: "2 hours ago",
//     content: "What an incredible victory last night! Hala Madrid!",
//     image: "/placeholder.svg",
//     isLiked: false,
//     likes: 245,
//     comments: 12,
//   },


//   {


//     id: "2",


//     avatar: "/placeholder.svg",


//     author: "HalaMadrid",


//     time: "5 hours ago",


//     content: "Who do you think we should sign next season?",


//     image: null,


//     isLiked: true,


//     likes: 178,


//     comments: 34,


//   },


// ];
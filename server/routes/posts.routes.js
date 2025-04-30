const express = require('express');
const PostService = require('../services/posts.services.js');




const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { authorId, avatar, content, image } = req.body
    const post = await PostService.createPost({ authorId, avatar, content, image })
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message })
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
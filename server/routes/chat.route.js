const express = require('express');
const Chat = require('../models/chat.model');
const User = require('../models/User');  // your User model

const router = express.Router();

// fetch all chat history, populated with username
router.get('/history', async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ createdAt: 1 })
      .populate('author', 'username');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// optional: post via REST instead of socket
router.post('/', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const chat = await Chat.create({ author: userId, content });
    const populated = await chat.populate('author', 'username');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require('express');
const store = require('../store');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = store.getBlogPosts();
  res.json(posts);
});

router.get('/posts/:id', async (req, res) => {
  const posts = store.getBlogPosts();
  const post = posts.find((p) => String(p.id) === String(req.params.id) || String(p._id) === String(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

module.exports = router;

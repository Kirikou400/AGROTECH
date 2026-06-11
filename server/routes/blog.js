const express = require('express');
const store = require('../store');

const router = express.Router();

router.get('/posts', async (req, res) => {
  const posts = store.getBlogPosts();
  res.json(posts);
});

module.exports = router;

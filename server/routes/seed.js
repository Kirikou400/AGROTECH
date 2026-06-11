const express = require('express');
const store = require('../store');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await store.seed();
    res.json({ message: 'Seed data created successfully', ...result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

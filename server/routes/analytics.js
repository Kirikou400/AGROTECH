const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const store = require('../store');

const router = express.Router();

router.get('/dashboard', auth, authorize('admin'), async (req, res) => {
  const dashboard = store.getDashboard();
  res.json(dashboard);
});

module.exports = router;

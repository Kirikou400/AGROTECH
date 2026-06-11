const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const store = require('../store');

const router = express.Router();

router.get('/inventory', auth, authorize('farmer'), async (req, res) => {
  const products = store.findProduceBySeller(req.user.id);
  res.json(products);
});

router.post('/inventory', auth, authorize('farmer'), async (req, res) => {
  const { category, name, quantity, price, location, description } = req.body;
  const listing = store.createProduce({
    seller: req.user.id,
    category,
    name,
    quantity,
    price,
    location,
    description,
  });
  res.status(201).json(listing);
});

router.put('/inventory/:id', auth, authorize('farmer'), async (req, res) => {
  const product = store.findProduceById(req.params.id);
  if (!product || String(product.seller) !== String(req.user.id)) {
    return res.status(404).json({ message: 'Produce item not found' });
  }
  const updated = store.updateProduce(req.params.id, req.body);
  res.json(updated);
});

router.delete('/inventory/:id', auth, authorize('farmer'), async (req, res) => {
  const product = store.findProduceById(req.params.id);
  if (!product || String(product.seller) !== String(req.user.id)) {
    return res.status(404).json({ message: 'Produce item not found' });
  }
  store.deleteProduce(req.params.id);
  res.json({ message: 'Produce removed' });
});

module.exports = router;

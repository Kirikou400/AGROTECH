const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const store = require('../store');

const router = express.Router();

router.get('/produce', async (req, res) => {
  const { category, location, minPrice, maxPrice, query } = req.query;
  const filter = { available: true };
  if (category) filter.category = category;
  if (location) filter.location = location;
  if (query) filter.name = query;
  if (minPrice) filter.minPrice = Number(minPrice);
  if (maxPrice) filter.maxPrice = Number(maxPrice);

  const products = store.findProduce(filter).map((item) => {
    const seller = store.findUserById(item.seller);
    return {
      ...item,
      seller: seller ? { name: seller.name, location: seller.location } : null,
    };
  });
  res.json(products);
});

router.get('/produce/:id', async (req, res) => {
  const product = store.findProduceById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Produce not found' });
  const seller = store.findUserById(product.seller);
  res.json({
    ...product,
    seller: seller ? { name: seller.name, location: seller.location } : null,
  });
});

router.post('/orders', auth, authorize('buyer'), async (req, res) => {
  const { items, deliveryOption, paymentMethod } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ message: 'Order items are required' });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = store.createOrder({
    buyer: req.user.id,
    items,
    total,
    deliveryOption,
    paymentMethod,
  });

  res.status(201).json(order);
});

router.get('/orders', auth, async (req, res) => {
  const orders = store.findOrdersByBuyer(req.user.id);
  res.json(orders);
});

module.exports = router;

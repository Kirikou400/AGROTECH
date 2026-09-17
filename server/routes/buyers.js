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

router.post('/orders', auth, async (req, res) => {
  const { items, deliveryOption, paymentMethod, total: requestedTotal } = req.body;
  if (!items || !items.length) {
    return res.status(400).json({ message: 'Order items are required' });
  }

  const deliveryFee = deliveryOption === 'partner-logistics' ? 2500 : deliveryOption === 'courier' ? 1200 : 0;
  const itemsTotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const finalTotal = requestedTotal ? Number(requestedTotal) : itemsTotal + deliveryFee;

  const order = store.createOrder({
    buyer: req.user.id,
    buyerName: req.user.name,
    items,
    total: finalTotal,
    deliveryOption: deliveryOption || 'courier',
    paymentMethod: paymentMethod || 'paystack',
    paymentStatus: 'paid', // Mark as paid for demo checkout flow
    status: 'confirmed',
  });

  res.status(201).json(order);
});

router.get('/orders', auth, async (req, res) => {
  const orders = store.findOrdersByBuyer(req.user.id);
  res.json(orders);
});

router.get('/orders/:id', auth, async (req, res) => {
  const orders = store.findOrdersByBuyer(req.user.id);
  const order = orders.find((o) => String(o._id) === String(req.params.id) || String(o.id) === String(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;

const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/initialize', auth, async (req, res) => {
  const { paymentMethod, amount, orderReference } = req.body;
  if (!paymentMethod || !amount || !orderReference) {
    return res.status(400).json({ message: 'Payment method, amount, and order reference are required' });
  }

  const providerUrl = paymentMethod === 'flutterwave'
    ? `https://flutterwave.com/pay/${orderReference}`
    : `https://paystack.com/pay/${orderReference}`;

  res.json({
    status: 'initialized',
    provider: paymentMethod,
    amount,
    checkoutUrl: providerUrl,
    message: `Redirect the buyer to ${paymentMethod} for Nigerian payments`,
  });
});

router.post('/verify', auth, (req, res) => {
  const { orderReference } = req.body;
  if (!orderReference) {
    return res.status(400).json({ message: 'Order reference is required' });
  }
  res.json({
    status: 'success',
    orderReference,
    paidAt: new Date(),
    message: 'Payment verified for demo purposes',
  });
});

module.exports = router;

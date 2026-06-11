const express = require('express');

const router = express.Router();

const options = [
  { id: 'pickup', title: 'Farm pickup', description: 'Collect produce directly from the farm.', price: 0 },
  { id: 'courier', title: 'Courier delivery', description: 'Fast delivery to your location within 48 hours.', price: 1200 },
  { id: 'partner-logistics', title: 'Partner logistics', description: 'Use our vetted transport and cold storage partners.', price: 2500 },
];

const partners = [
  { name: 'GreenWay Logistics', service: 'Road freight & cold storage', contact: '0801-234-5678' },
  { name: 'Harvest Cargo', service: 'Same-day delivery for perishables', contact: '0802-987-6543' },
];

router.get('/options', (req, res) => {
  res.json(options);
});

router.get('/partners', (req, res) => {
  res.json(partners);
});

module.exports = router;

const users = [
  {
    name: 'Amina Bello',
    email: 'amina@example.com',
    password: 'farmer123',
    role: 'farmer',
    location: 'Kano',
    phone: '08012345678',
    company: 'GreenHarvest Farms',
  },
  {
    name: 'Chinedu Okeke',
    email: 'chinedu@example.com',
    password: 'buyer123',
    role: 'buyer',
    location: 'Lagos',
    phone: '08023456789',
  },
  {
    name: 'Tunde Ibrahim',
    email: 'tunde@example.com',
    password: 'admin123',
    role: 'admin',
    location: 'Abuja',
    phone: '08034567890',
  },
];

const produce = [
  {
    category: 'grains',
    name: 'Premium Maize',
    quantity: 120,
    price: 2500,
    location: 'Kano',
    description: 'Bulk maize suitable for animal feed and milling.',
  },
  {
    category: 'vegetables',
    name: 'Organic Spinach',
    quantity: 60,
    price: 400,
    location: 'Ibadan',
    description: 'Fresh leafy greens ready for market.',
  },
  {
    category: 'livestock',
    name: 'Free-range Goats',
    quantity: 12,
    price: 90000,
    location: 'Enugu',
    description: 'Healthy goats for sale with vaccination records.',
  },
  {
    category: 'grains',
    name: 'Sorghum Mix',
    quantity: 80,
    price: 2100,
    location: 'Kaduna',
    description: 'Drought-tolerant sorghum for feed and brewing.',
  },
];

const analytics = [
  { metric: 'Monthly demand growth', value: 18, trend: 'up' },
  { metric: 'Average crop price', value: 4500, trend: 'up' },
  { metric: 'Farmer participation', value: 382, trend: 'up' },
  { metric: 'Logistics bookings', value: 124, trend: 'flat' },
];

const blogPosts = [
  {
    title: 'Smart Farming with IoT and Drones',
    excerpt: 'Discover how drones and sensors can improve yield and reduce waste across Nigerian farms.',
    content: 'AgroTech Hub is preparing to integrate security-tech tools like drone surveillance and GPS tracking to support modern farming operations.',
  },
  {
    title: 'Funding access for smallholder farmers',
    excerpt: 'Learn about grants, loans, and partnerships that help growers scale.',
    content: 'Our platform connects farmers with funding resources and digital training to support growth and formalization.',
  },
  {
    title: 'Top 5 crops buyers want in 2026',
    excerpt: 'A quick market update on crop demand and pricing trends.',
    content: 'Buyers are looking for quality grains, vegetables, and livestock from verified producers. We monitor trends to help sellers price competitively.',
  },
];

module.exports = { users, produce, analytics, blogPosts };

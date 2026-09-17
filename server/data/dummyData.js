
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
    name: 'Premium White Maize',
    quantity: 120,
    price: 2500,
    location: 'Kano',
    description: 'Clean, dried yellow and white bulk maize suitable for milling, poultry feed, and food production.',
  },
  {
    category: 'vegetables',
    name: 'Fresh Jos Bell Peppers',
    quantity: 85,
    price: 1800,
    location: 'Plateau',
    description: 'Crisp green and red bell peppers harvested fresh from the Jos plateau highlands.',
  },
  {
    category: 'tubers',
    name: 'Benue Pona Yam Tubers',
    quantity: 200,
    price: 3200,
    location: 'Benue',
    description: 'Export-grade dry-season yams from the Food Basket of the Nation. High starch content, premium size.',
  },
  {
    category: 'vegetables',
    name: 'Organic Farm Spinach & Ugwu',
    quantity: 60,
    price: 600,
    location: 'Ibadan',
    description: 'Freshly harvested fluted pumpkin leaves (Ugwu) and green spinach, pesticide-free.',
  },
  {
    category: 'fruits',
    name: 'Sweet Ogbomoso Mangoes',
    quantity: 150,
    price: 1500,
    location: 'Oyo',
    description: 'Naturally sweetened, ripe Ogbomoso export mangoes packed in ventilated crates.',
  },
  {
    category: 'livestock',
    name: 'Free-range Sahel Goats',
    quantity: 15,
    price: 75000,
    location: 'Enugu',
    description: 'Fully grown, healthy Sahelian meat goats with complete veterinary vaccination documentation.',
  },
  {
    category: 'grains',
    name: 'Certified Soybean Bags',
    quantity: 95,
    price: 4500,
    location: 'Kaduna',
    description: 'High-protein grain soybeans graded for edible oil processing and industrial feed formulation.',
  },
  {
    category: 'livestock',
    name: 'Smoked Table Catfish',
    quantity: 40,
    price: 12000,
    location: 'Lagos',
    description: 'Oven-dried, hygienically packaged catfish fillets with 6-month shelf life. Zero sand or charcoal residue.',
  },
];

const analytics = [
  { metric: 'Monthly demand growth', value: 24, trend: 'up' },
  { metric: 'Average crop price (₦)', value: 4850, trend: 'up' },
  { metric: 'Farmer participation', value: 412, trend: 'up' },
  { metric: 'Logistics bookings', value: 168, trend: 'up' },
  { metric: 'Fulfilled orders', value: 345, trend: 'up' },
  { metric: 'Active buyers', value: 580, trend: 'up' },
];

const blogPosts = [
  {
    title: 'Smart Farming with IoT, Drones and Satellite Monitoring',
    excerpt: 'Discover how drones and soil sensors are boosting agricultural yield and reducing harvest loss across Nigeria.',
    content: 'Arab’s AgroTech Hub is bridging the gap between smallholder farmers and modern precision tools. Through affordable drone aerial multispectral imaging, GPS-guided soil mapping, and remote moisture monitoring, farmers in Kano, Kaduna, and Oyo are reducing input waste by 30% while raising crop yields significantly. We are committed to making these technologies accessible through cooperative pooling and shared equipment centers.',
  },
  {
    title: 'Accessing Agri-Grants, Bank of Agriculture Loans, and Capital',
    excerpt: 'A practical roadmap to unlocking agricultural grants, working capital loans, and equity funding for growers.',
    content: 'Securing capital remains one of the largest bottlenecks for Nigerian agri-entrepreneurs. In this guide, we outline verified avenues including the Anchor Borrowers Program, Bank of Industry SME agro-funds, and climate-smart innovation grants. Registered members on Arab’s AgroTech Hub can access streamlined digital receipts, sales records, and credit verification documents that financial institutions require for loan underwriting.',
  },
  {
    title: 'Nigerian Crop Demand Forecast & High-Yield Markets in 2026',
    excerpt: 'Crucial market intelligence on grain pricing, cold storage logistics, and high-demand commercial vegetables.',
    content: 'Commercial food processors, exporters, and urban retailers are actively seeking consistent supplies of graded grain maize, soya beans, dry-season onions, and table fish. By planning your planting cycles according to forward demand contracts available on Arab’s AgroTech Hub, growers can hedge against post-harvest market crashes and lock in guaranteed purchase prices before field harvest begins.',
  },
  {
    title: 'Minimizing Post-Harvest Losses with Solar Cold Rooms',
    excerpt: 'How temperature-controlled logistics and rural solar refrigeration preserve vegetable freshness and profits.',
    content: 'Up to 45% of perishable fruits and vegetables in West Africa are lost in transit. By connecting local farm hubs to solar-powered cold hubs and temperature-regulated logistics partners through Arab’s AgroTech Hub, farmers preserve nutritional value, extend market shelf-life by up to 3 weeks, and unlock metropolitan buyer pricing.',
  },
];

module.exports = { users, produce, analytics, blogPosts };


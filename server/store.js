const bcrypt = require('bcryptjs');
const { users: seedUsers, produce: seedProduce, analytics: seedAnalytics, blogPosts: seedBlogPosts } = require('./data/dummyData');

const generateId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const state = {
  users: [],
  produce: [],
  orders: [],
  analytics: [],
  blogPosts: [],
};

const clearAll = () => {
  state.users = [];
  state.produce = [];
  state.orders = [];
  state.analytics = [];
  state.blogPosts = [];
};

const seed = async () => {
  clearAll();
  state.users = await Promise.all(seedUsers.map(async (user) => {
    const id = generateId();
    return {
      ...user,
      id,
      _id: id,
      password: await bcrypt.hash(user.password, 10),
    };
  }));

  const farmer = state.users.find((item) => item.role === 'farmer');
  state.produce = seedProduce.map((item) => {
    const id = generateId();
    return {
      ...item,
      id,
      _id: id,
      seller: farmer?.id || null,
      available: true,
      createdAt: new Date(),
    };
  });

  state.analytics = seedAnalytics.map((item) => {
    const id = generateId();
    return { ...item, id, _id: id, updatedAt: new Date() };
  });

  state.blogPosts = seedBlogPosts.map((item) => {
    const id = generateId();
    return { ...item, id, _id: id, publishedAt: new Date() };
  });

  // Also add sample orders so admin insights and order histories have rich realistic data
  const buyer = state.users.find((u) => u.role === 'buyer');
  if (buyer && state.produce.length >= 2) {
    const sampleItems = [
      {
        produce: state.produce[0]._id,
        name: state.produce[0].name,
        quantity: 2,
        price: state.produce[0].price,
        seller: state.produce[0].seller,
      },
      {
        produce: state.produce[1]._id,
        name: state.produce[1].name,
        quantity: 1,
        price: state.produce[1].price,
        seller: state.produce[1].seller,
      },
    ];
    const orderId = generateId();
    state.orders.push({
      _id: orderId,
      id: orderId,
      buyer: buyer.id,
      buyerName: buyer.name,
      items: sampleItems,
      total: sampleItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 1200,
      deliveryOption: 'courier',
      paymentMethod: 'paystack',
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 86400000),
    });
  }

  return {
    users: state.users.length,
    produce: state.produce.length,
    analytics: state.analytics.length,
    blogPosts: state.blogPosts.length,
    orders: state.orders.length,
  };
};

// Automatically run seed on module initialization so fallback store has initial data
seed().catch((err) => console.error('Failed to auto-seed store:', err));

const findUserByEmail = (email) => state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
const findUserById = (id) => state.users.find((user) => String(user.id) === String(id) || String(user._id) === String(id));
const createUser = (user) => {
  const id = generateId();
  const newUser = { ...user, id, _id: id, createdAt: new Date() };
  state.users.push(newUser);
  return newUser;
};

const createProduce = (produce) => {
  const id = generateId();
  const newProduce = {
    ...produce,
    id,
    _id: id,
    price: Number(produce.price) || 0,
    quantity: Number(produce.quantity) || 0,
    available: produce.available !== false,
    createdAt: new Date(),
  };
  state.produce.unshift(newProduce);
  return newProduce;
};

const findProduce = (filter = {}) => {
  return state.produce.filter((item) => {
    if (filter.available !== undefined && item.available !== filter.available) return false;
    if (filter.category && item.category.toLowerCase() !== filter.category.toLowerCase()) return false;
    if (filter.location && !item.location.toLowerCase().includes(String(filter.location).toLowerCase())) return false;
    if (filter.name) {
      const q = String(filter.name).toLowerCase();
      const matchName = item.name && item.name.toLowerCase().includes(q);
      const matchDesc = item.description && item.description.toLowerCase().includes(q);
      const matchCat = item.category && item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    if (filter.minPrice != null && !isNaN(filter.minPrice) && item.price < Number(filter.minPrice)) return false;
    if (filter.maxPrice != null && !isNaN(filter.maxPrice) && item.price > Number(filter.maxPrice)) return false;
    return true;
  });
};

const findProduceById = (id) => state.produce.find((item) => String(item._id) === String(id) || String(item.id) === String(id));
const findProduceBySeller = (sellerId) => state.produce.filter((item) => String(item.seller) === String(sellerId));

const updateProduce = (id, update) => {
  const item = findProduceById(id);
  if (!item) return null;
  if (update.price != null) update.price = Number(update.price) || item.price;
  if (update.quantity != null) update.quantity = Number(update.quantity) || item.quantity;
  Object.assign(item, update);
  return item;
};

const deleteProduce = (id) => {
  const index = state.produce.findIndex((item) => String(item._id) === String(id) || String(item.id) === String(id));
  if (index === -1) return null;
  return state.produce.splice(index, 1)[0];
};

const createOrder = (order) => {
  const id = generateId();
  const newOrder = {
    ...order,
    _id: id,
    id,
    status: order.status || 'pending',
    paymentStatus: order.paymentStatus || 'unpaid',
    createdAt: new Date(),
  };
  state.orders.unshift(newOrder);
  return newOrder;
};

const findOrdersByBuyer = (buyerId) => state.orders.filter((order) => String(order.buyer) === String(buyerId));

const findOrdersBySeller = (sellerId) => {
  // Find orders where either items list this seller or item produce belongs to this seller
  const sellerProduceIds = new Set(state.produce.filter((p) => String(p.seller) === String(sellerId)).map((p) => String(p._id)));
  return state.orders.filter((order) => {
    return order.items && order.items.some((item) => {
      return String(item.seller) === String(sellerId) || sellerProduceIds.has(String(item.produce));
    });
  });
};

const getDashboard = () => ({
  totalProducts: state.produce.length,
  activeOrders: state.orders.filter((order) => ['pending', 'confirmed', 'dispatched'].includes(order.status)).length,
  paidOrders: state.orders.filter((order) => order.paymentStatus === 'paid').length,
  summary: state.analytics,
  recentOrders: state.orders.slice(0, 5),
});

const getBlogPosts = () => state.blogPosts;

module.exports = {
  state,
  clearAll,
  seed,
  findUserByEmail,
  findUserById,
  createUser,
  createProduce,
  findProduce,
  findProduceById,
  findProduceBySeller,
  updateProduce,
  deleteProduce,
  createOrder,
  findOrdersByBuyer,
  findOrdersBySeller,
  getDashboard,
  getBlogPosts,
};


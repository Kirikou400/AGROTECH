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
  state.users = await Promise.all(seedUsers.map(async (user) => ({
    ...user,
    id: generateId(),
    password: await bcrypt.hash(user.password, 10),
  })));
  const farmer = state.users.find((item) => item.role === 'farmer');
  state.produce = seedProduce.map((item) => ({ ...item, _id: generateId(), seller: farmer?.id || null, available: true, createdAt: new Date() }));
  state.analytics = seedAnalytics.map((item) => ({ ...item, id: generateId(), updatedAt: new Date() }));
  state.blogPosts = seedBlogPosts.map((item) => ({ ...item, id: generateId(), publishedAt: new Date() }));
  return { users: state.users.length, produce: state.produce.length, analytics: state.analytics.length, blogPosts: state.blogPosts.length };
};

const findUserByEmail = (email) => state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
const findUserById = (id) => state.users.find((user) => String(user.id) === String(id));
const createUser = (user) => {
  const newUser = { ...user, id: generateId(), createdAt: new Date() };
  state.users.push(newUser);
  return newUser;
};

const createProduce = (produce) => {
  const newProduce = { ...produce, _id: generateId(), available: true, createdAt: new Date() };
  state.produce.unshift(newProduce);
  return newProduce;
};

const findProduce = (filter = {}) => {
  return state.produce.filter((item) => {
    if (filter.available !== undefined && item.available !== filter.available) return false;
    if (filter.category && item.category !== filter.category) return false;
    if (filter.location && !item.location.toLowerCase().includes(String(filter.location).toLowerCase())) return false;
    if (filter.name && !item.name.toLowerCase().includes(String(filter.name).toLowerCase())) return false;
    if (filter.minPrice != null && item.price < Number(filter.minPrice)) return false;
    if (filter.maxPrice != null && item.price > Number(filter.maxPrice)) return false;
    return true;
  });
};

const findProduceById = (id) => state.produce.find((item) => String(item._id) === String(id));
const findProduceBySeller = (sellerId) => state.produce.filter((item) => String(item.seller) === String(sellerId));

const updateProduce = (id, update) => {
  const item = findProduceById(id);
  if (!item) return null;
  Object.assign(item, update);
  return item;
};

const deleteProduce = (id) => {
  const index = state.produce.findIndex((item) => String(item._id) === String(id));
  if (index === -1) return null;
  return state.produce.splice(index, 1)[0];
};

const createOrder = (order) => {
  const newOrder = { ...order, _id: generateId(), status: 'pending', paymentStatus: 'unpaid', createdAt: new Date() };
  state.orders.unshift(newOrder);
  return newOrder;
};

const findOrdersByBuyer = (buyerId) => state.orders.filter((order) => String(order.buyer) === String(buyerId));

const getDashboard = () => ({
  totalProducts: state.produce.length,
  activeOrders: state.orders.filter((order) => ['pending', 'confirmed', 'dispatched'].includes(order.status)).length,
  paidOrders: state.orders.filter((order) => order.paymentStatus === 'paid').length,
  summary: state.analytics,
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
  getDashboard,
  getBlogPosts,
};

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const produceRoutes = require('./routes/produce');
const buyerRoutes = require('./routes/buyers');
const logisticsRoutes = require('./routes/logistics');
const paymentRoutes = require('./routes/payments');
const analyticsRoutes = require('./routes/analytics');
const blogRoutes = require('./routes/blog');
const seedRoutes = require('./routes/seed');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/farmers', produceRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', analyticsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/seed', seedRoutes);

app.get('/', (req, res) => {
  res.send({ message: "Welcome to Arab's AgroTech Hub API" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

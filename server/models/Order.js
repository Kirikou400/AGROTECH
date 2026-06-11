const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      produce: { type: mongoose.Schema.Types.ObjectId, ref: 'Produce', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  deliveryOption: { type: String, required: true, enum: ['pickup', 'courier', 'partner-logistics'] },
  paymentMethod: { type: String, required: true, enum: ['paystack', 'flutterwave', 'bank-transfer', 'cash'] },
  status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled'] },
  paymentStatus: { type: String, default: 'unpaid', enum: ['unpaid', 'paid', 'failed'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);

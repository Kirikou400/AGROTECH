import { useContext, useState } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const OrderSummary = () => {
  const { items, total, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('paystack');
  const [status, setStatus] = useState('');

  const checkout = async () => {
    if (!user) {
      setStatus('Please sign in before placing an order.');
      return;
    }
    try {
      const orderPayload = {
        items: items.map((item) => ({
          produce: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        deliveryOption: delivery,
        paymentMethod: payment,
      };
      const response = await axios.post('/api/buyers/orders', orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(`Order created: ${response.data._id}`);
      clearCart();
    } catch (error) {
      setStatus(error.response?.data?.message || 'Checkout failed');
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-glow">
      <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Items</span>
          <span>{items.length}</span>
        </div>
        <div className="flex justify-between text-sm text-slate-600">
          <span>Delivery</span>
          <span>{delivery}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-slate-900">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <select value={delivery} onChange={(e) => setDelivery(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
          <option value="pickup">Pickup</option>
          <option value="courier">Courier</option>
          <option value="partner-logistics">Partner logistics</option>
        </select>
        <select value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
          <option value="paystack">Paystack</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="cash">Cash on delivery</option>
        </select>
        <button onClick={checkout} className="w-full rounded-full bg-agrogold px-4 py-3 text-sm font-semibold text-white transition hover:bg-yellow-500">
          Place order
        </button>
      </div>
      {status && <p className="mt-4 text-sm text-slate-600">{status}</p>}
    </div>
  );
};

export default OrderSummary;

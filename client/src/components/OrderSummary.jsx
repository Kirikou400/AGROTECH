import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const deliveryRates = {
  pickup: { label: 'Self Pickup at Farm Hub', cost: 0, time: 'Same-day pickup' },
  courier: { label: 'Express Courier (Standard)', cost: 1200, time: '24 - 48 hours delivery' },
  'partner-logistics': { label: 'Partner Cold-Chain Logistics', cost: 2500, time: 'Temperature-controlled, 24 hours' },
};

const OrderSummary = () => {
  const { items, total, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const [delivery, setDelivery] = useState('courier');
  const [payment, setPayment] = useState('paystack');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  const deliveryCost = deliveryRates[delivery]?.cost || 0;
  const grandTotal = total + deliveryCost;

  const handleCheckout = async () => {
    if (!user) {
      setErrorMessage('Please sign in to complete your checkout.');
      return;
    }
    if (!items.length) {
      setErrorMessage('Your cart is empty. Please add crops from the marketplace first.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        items: items.map((item) => ({
          produce: item._id || item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          seller: item.seller?.id || item.seller,
        })),
        deliveryOption: delivery,
        paymentMethod: payment,
        total: grandTotal,
      };

      const response = await axios.post('/api/buyers/orders', orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCompletedOrder(response.data);
      clearCart();
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-glow sticky top-24">
        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">
          <span>Order Summary</span>
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {items.length} items
          </span>
        </h2>

        {/* Breakdown */}
        <div className="mt-5 space-y-3 border-b border-slate-100 pb-5 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Produce subtotal</span>
            <span className="font-semibold text-slate-900">₦{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Logistics fee ({deliveryRates[delivery]?.label.split(' ')[0]})</span>
            <span className="font-semibold text-slate-900">
              {deliveryCost === 0 ? <span className="text-emerald-600">Free</span> : `₦${deliveryCost.toLocaleString()}`}
            </span>
          </div>
          <div className="flex justify-between text-slate-600 text-xs">
            <span className="text-slate-500">Estimated delivery</span>
            <span className="text-emerald-700 font-medium">{deliveryRates[delivery]?.time}</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="flex justify-between items-baseline py-4 border-b border-slate-100">
          <span className="text-base font-semibold text-slate-900">Total Amount</span>
          <span className="text-2xl font-black text-slate-900">₦{grandTotal.toLocaleString()}</span>
        </div>

        {/* Options */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Select Delivery Method
            </label>
            <select
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3.5 py-3 text-sm text-slate-800 focus:border-agrolime focus:ring-1 focus:ring-agrolime bg-slate-50/50"
            >
              <option value="pickup">Farm Pickup (₦0 - Self collect)</option>
              <option value="courier">Standard Courier (₦1,200 - 48hrs)</option>
              <option value="partner-logistics">Cold-Chain Partner (₦2,500 - Perishables)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
              Payment Gateway
            </label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-3.5 py-3 text-sm text-slate-800 focus:border-agrolime focus:ring-1 focus:ring-agrolime bg-slate-50/50"
            >
              <option value="paystack">Paystack (Debit Card, Bank Transfer, USSD)</option>
              <option value="flutterwave">Flutterwave (Naira Card, Mobile Money)</option>
              <option value="cash">Pay on Delivery (Verified Buyers)</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isSubmitting || items.length === 0}
            className={`w-full rounded-full py-3.5 px-4 text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${
              items.length === 0
                ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                : isSubmitting
                ? 'bg-emerald-700 cursor-wait'
                : 'bg-agrogold hover:bg-yellow-600'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Complete Order · ₦{grandTotal.toLocaleString()}</span>
              </>
            )}
          </button>
        </div>

        {errorMessage && (
          <div className="mt-4 rounded-2xl bg-rose-50 border border-rose-200/60 p-3 text-xs text-rose-700">
            {errorMessage}
          </div>
        )}

        {/* Security / Escrow guarantee badge */}
        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50/70 p-3 text-xs text-emerald-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>AgroTech Escrow Protection: Funds released to farmer only upon safe delivery verification.</span>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">Order Confirmed!</h3>
              <p className="mt-2 text-sm text-slate-600">
                Thank you, <strong>{completedOrder.buyerName || user?.name}</strong>! Your order reference is{' '}
                <span className="font-mono font-semibold text-agrolime bg-emerald-50 px-2 py-0.5 rounded">
                  {completedOrder._id || completedOrder.id}
                </span>
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Payment Status</span>
                <span className="font-semibold text-emerald-600 uppercase text-xs tracking-wider bg-emerald-100 px-2 py-0.5 rounded-full">
                  {completedOrder.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Method</span>
                <span className="font-semibold text-slate-900 capitalize">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Option</span>
                <span className="font-semibold text-slate-900 capitalize">{completedOrder.deliveryOption}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-2 mt-2">
                <span>Grand Total Paid</span>
                <span>₦{(Number(completedOrder.total) || grandTotal).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setCompletedOrder(null)}
                className="w-full rounded-full border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Close Receipt
              </button>
              <Link
                to="/marketplace"
                onClick={() => setCompletedOrder(null)}
                className="w-full text-center rounded-full bg-agrolime py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;

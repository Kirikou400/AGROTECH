import { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { user, login } = useContext(AuthContext);

  const handleDemoBuyerLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', {
        email: 'chinedu@example.com',
        password: 'buyer123',
      });
      login(res.data.user, res.data.token);
    } catch (err) {
      console.error('Demo buyer login failed:', err);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-agrolime">Direct Farm Procurement</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Review & Checkout</h1>
        </div>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-agrolime hover:text-emerald-700"
        >
          ← Continue shopping in Marketplace
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Sign In Alert if not authenticated */}
          {!user && (
            <div className="rounded-[32px] border border-amber-200 bg-amber-50/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-amber-900">
                <span className="text-2xl">🔐</span>
                <div>
                  <h3 className="text-sm font-bold">Authentication Required</h3>
                  <p className="text-xs text-amber-700 mt-0.5">
                    Please sign in or register to attach your delivery address and receive invoice receipts.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDemoBuyerLogin}
                  className="rounded-full bg-amber-600 hover:bg-amber-700 px-4 py-2 text-xs font-bold text-white transition whitespace-nowrap"
                >
                  Demo Sign-In (Chinedu)
                </button>
                <Link
                  to="/login"
                  className="rounded-full border border-amber-400 px-4 py-2 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition whitespace-nowrap"
                >
                  Sign in
                </Link>
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="rounded-[36px] bg-white p-8 shadow-glow border border-slate-200/80">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Items in Your Cart</h2>
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition"
                >
                  Clear all items
                </button>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {items.length ? (
                items.map((item) => {
                  const itemId = item._id || item.id;
                  const itemPrice = Number(item.price) || 0;
                  const itemQty = Number(item.quantity) || 1;
                  const itemTotal = itemPrice * itemQty;

                  return (
                    <div
                      key={itemId}
                      className="rounded-3xl border border-slate-200 p-5 hover:border-slate-300 transition bg-slate-50/30"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] uppercase tracking-wider font-bold text-agrolime bg-emerald-50 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <span className="text-xs text-slate-500">📍 {item.location || 'Nigeria'}</span>
                          </div>
                          <h3 className="mt-1.5 text-lg font-bold text-slate-900">{item.name}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Unit Price: <span className="font-semibold text-slate-700">₦{itemPrice.toLocaleString()}</span>
                          </p>
                        </div>

                        {/* Quantity Counter & Removal */}
                        <div className="flex items-center justify-between sm:justify-end gap-5">
                          <div className="flex items-center gap-2 border border-slate-200 rounded-full bg-white px-2 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemId, itemQty - 1)}
                              className="h-7 w-7 rounded-full text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm transition"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-slate-900">
                              {itemQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(itemId, itemQty + 1)}
                              className="h-7 w-7 rounded-full text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm transition"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right min-w-[100px]">
                            <p className="text-lg font-black text-slate-900">₦{itemTotal.toLocaleString()}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(itemId)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition"
                            title="Remove from cart"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-14 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl mb-4">
                    🛒
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Your basket is currently empty</h3>
                  <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
                    Explore available farm listings across Nigeria and add produce to checkout.
                  </p>
                  <Link
                    to="/marketplace"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-agrolime px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
                  >
                    Browse Produce Marketplace
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </section>
  );
};

export default Checkout;

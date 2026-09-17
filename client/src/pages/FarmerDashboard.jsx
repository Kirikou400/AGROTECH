import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const FarmerDashboard = () => {
  const { user, token, login } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);
  const [farmerOrders, setFarmerOrders] = useState([]);
  const [form, setForm] = useState({
    category: 'grains',
    name: '',
    quantity: '',
    price: '',
    location: user?.location || '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders'

  const loadInventory = async () => {
    if (!token) return;
    try {
      const [invRes, orderRes] = await Promise.all([
        axios.get('/api/farmers/inventory', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/farmers/orders', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] })),
      ]);
      setInventory(invRes.data);
      setFarmerOrders(orderRes.data || []);
      setMessage('');
    } catch (error) {
      if (user?.role !== 'farmer') {
        setMessage('Your account is currently signed in as a non-farmer role. Sign in as a farmer to manage listings.');
      } else {
        setMessage('Unable to load inventory. Please check your session.');
      }
    }
  };

  useEffect(() => {
    if (token) {
      loadInventory();
      if (user?.location && !form.location) {
        setForm((prev) => ({ ...prev, location: user.location }));
      }
    }
  }, [token, user]);

  const submitProduce = async (event) => {
    event.preventDefault();
    if (!token) {
      setMessage('Please sign in as a farmer before adding listings.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      };
      const response = await axios.post('/api/farmers/inventory', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventory([response.data, ...inventory]);
      setMessage('Produce listed successfully on Arab’s AgroTech Hub marketplace!');
      setForm({ category: 'grains', name: '', quantity: '', price: '', location: user?.location || '', description: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add produce. Please verify your fields.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to remove this crop listing?')) return;
    try {
      await axios.delete(`/api/farmers/inventory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventory(inventory.filter((item) => (item._id || item.id) !== id));
      setMessage('Listing removed successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to delete listing.');
    }
  };

  const toggleAvailability = async (item) => {
    const id = item._id || item.id;
    try {
      const res = await axios.put(
        `/api/farmers/inventory/${id}`,
        { available: !item.available },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInventory(inventory.map((i) => ((i._id || i.id) === id ? res.data : i)));
    } catch (error) {
      setMessage('Failed to toggle stock status.');
    }
  };

  const handleDemoFarmerLogin = async () => {
    try {
      const res = await axios.post('/api/auth/login', {
        email: 'amina@example.com',
        password: 'farmer123',
      });
      login(res.data.user, res.data.token);
    } catch (err) {
      setMessage('Failed to sign in as demo farmer');
    }
  };

  // Calculations
  const totalUnits = inventory.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalValue = inventory.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:items-center rounded-[36px] overflow-hidden shadow-glow bg-gradient-to-br from-emerald-700 via-emerald-600 to-lime-700 text-white">
        <div className="p-8 sm:p-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20">
            Producer Portal
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-black">Farmer Operation Hub</h1>
          <p className="mt-3 text-base leading-relaxed text-white/90">
            Publish agricultural harvests, track stock levels in real time, and connect directly with bulk buyers across Nigeria without exploitative middlemen.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-emerald-100">
            <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full">
              ✓ Direct Escrow Settlement
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full">
              ✓ Cold-Chain Logistics Included
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full">
              ✓ Guaranteed Fair Market Pricing
            </span>
          </div>
        </div>
        <div className="relative h-64 lg:h-full min-h-[260px]">
          <img
            src="/images/img1.png"
            alt="Arab's AgroTech Hub farmer tools"
            className="h-full w-full object-cover opacity-85 mix-blend-overlay"
          />
        </div>
      </div>

      {/* Demo Sign-In Notice if not logged in as Farmer */}
      {user?.role !== 'farmer' && (
        <div className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-emerald-900">Experience the Farmer Hub Demo</h3>
            <p className="text-xs text-emerald-700 mt-1">
              Test inventory publishing, availability toggles, and incoming order views with the verified farmer profile (Amina Bello, Kano).
            </p>
          </div>
          <button
            onClick={handleDemoFarmerLogin}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-agrolime hover:bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-sm transition whitespace-nowrap"
          >
            <span>1-Click Sign-In as Farmer (Amina)</span>
          </button>
        </div>
      )}

      {message && (
        <div className="mb-8 rounded-2xl bg-slate-900 p-4 text-xs font-medium text-emerald-300 shadow-md flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="mb-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">My Listed Crops</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{inventory.length}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Active marketplace entries</p>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Available Crop Volume</p>
          <p className="mt-2 text-3xl font-black text-agrogold">{totalUnits.toLocaleString()} units</p>
          <p className="mt-1 text-xs text-slate-500 font-medium">Ready for buyer dispatch</p>
        </div>
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Inventory Valuation</p>
          <p className="mt-2 text-3xl font-black text-emerald-700">₦{totalValue.toLocaleString()}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Gross portfolio value</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Left Form: Add Produce Listing */}
        <div className="lg:col-span-1">
          <div className="rounded-[36px] bg-white p-8 shadow-glow border border-slate-200/80 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">List New Produce</h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                Instant Publish
              </span>
            </div>

            <form onSubmit={submitProduce} className="mt-5 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Crop Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
                >
                  <option value="grains">🌾 Grains (Maize, Sorghum, Rice)</option>
                  <option value="vegetables">🥬 Vegetables (Peppers, Spinach, Tomatoes)</option>
                  <option value="tubers">🥔 Tubers (Yam, Cassava, Potatoes)</option>
                  <option value="fruits">🥭 Fruits (Mango, Citrus, Watermelon)</option>
                  <option value="livestock">🐐 Livestock & Fisheries (Goat, Fish, Poultry)</option>
                  <option value="other">🌱 Other Agricultural Inputs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Produce Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Dry White Maize (Bags)"
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-slate-800 bg-slate-50/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    placeholder="e.g. 50"
                    className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-slate-800 bg-slate-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Unit Price (₦)</label>
                  <input
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. 3500"
                    className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-slate-800 bg-slate-50/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Farm Location / State</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Kano, Benue, Kaduna"
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-slate-800 bg-slate-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Description & Quality Details</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Mention moisture content, grade, packaging, harvesting date..."
                  className="w-full rounded-2xl border border-slate-200 px-3.5 py-2.5 text-slate-800 bg-slate-50/50"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-agrolime py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                {submitting ? 'Publishing...' : 'Publish to Marketplace'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Tab: Inventory List & Incoming Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[36px] bg-white p-8 shadow-glow border border-slate-200/80">
            {/* Tab navigation */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`text-base font-bold pb-1 transition-colors border-b-2 ${
                    activeTab === 'inventory'
                      ? 'border-agrolime text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  My Current Listings ({inventory.length})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`text-base font-bold pb-1 transition-colors border-b-2 ${
                    activeTab === 'orders'
                      ? 'border-agrolime text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Incoming Orders ({farmerOrders.length})
                </button>
              </div>

              <button
                onClick={loadInventory}
                className="text-xs text-agrolime hover:text-emerald-700 font-semibold flex items-center gap-1"
              >
                ↻ Refresh
              </button>
            </div>

            {/* Tab: Inventory List */}
            {activeTab === 'inventory' && (
              <div className="mt-6 space-y-4">
                {inventory.length ? (
                  inventory.map((item) => {
                    const itemId = item._id || item.id;
                    const isAvailable = item.available !== false;
                    return (
                      <div
                        key={itemId}
                        className="rounded-3xl border border-slate-200 p-5 hover:border-slate-300 transition bg-slate-50/40"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs uppercase tracking-widest font-bold text-agrolime bg-emerald-50 px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isAvailable ? '● In Stock' : '○ Out of Stock'}
                              </span>
                            </div>
                            <h3 className="mt-2 text-xl font-bold text-slate-900">{item.name}</h3>
                            <p className="mt-1 text-xs text-slate-500">
                              Location: <strong className="text-slate-700">{item.location}</strong>
                            </p>
                            {item.description && (
                              <p className="mt-2 text-xs text-slate-600 line-clamp-2 max-w-lg">
                                {item.description}
                              </p>
                            )}
                          </div>

                          <div className="sm:text-right flex sm:flex-col justify-between sm:justify-start items-baseline sm:items-end gap-1">
                            <p className="text-2xl font-black text-agrogold">
                              ₦{(Number(item.price) || 0).toLocaleString()}
                            </p>
                            <p className="text-xs font-semibold text-slate-500">
                              {item.quantity} units available
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <button
                            onClick={() => toggleAvailability(item)}
                            className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1.5"
                          >
                            <span>Status:</span>
                            <span className="underline">{isAvailable ? 'Mark Out of Stock' : 'Mark Available'}</span>
                          </button>

                          <button
                            onClick={() => deleteItem(itemId)}
                            className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Delete Listing</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
                    <p className="text-base font-semibold text-slate-700">No inventory listed yet</p>
                    <p className="text-xs text-slate-400 mt-1">Use the form on the left to add your first harvest listing.</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Orders for Produce */}
            {activeTab === 'orders' && (
              <div className="mt-6 space-y-4">
                {farmerOrders.length ? (
                  farmerOrders.map((order) => (
                    <div key={order._id || order.id} className="rounded-3xl border border-slate-200 p-5 bg-slate-50/50">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-slate-700">
                          Order #{order._id || order.id}
                        </span>
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 uppercase">
                          {order.paymentStatus || 'paid'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Buyer: <strong>{order.buyerName || 'Verified Buyer'}</strong></p>
                      <div className="mt-3 divide-y divide-slate-200/60 border-t border-b border-slate-200/60 py-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between py-1 text-xs">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-bold">₦{((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-between items-baseline text-xs">
                        <span className="text-slate-500">Fulfillment: <strong className="capitalize text-slate-700">{order.deliveryOption}</strong></span>
                        <span className="text-sm font-bold text-slate-900">Total: ₦{(Number(order.total) || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
                    <p className="text-base font-semibold text-slate-700">No incoming orders yet</p>
                    <p className="text-xs text-slate-400 mt-1">When buyers order your crops through the marketplace, they will show up here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerDashboard;

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const FarmerDashboard = () => {
  const { token } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({ category: 'grains', name: '', quantity: '', price: '', location: '', description: '' });
  const [message, setMessage] = useState('');

  const loadInventory = async () => {
    try {
      const response = await axios.get('/api/farmers/inventory', { headers: { Authorization: `Bearer ${token}` } });
      setInventory(response.data);
    } catch (error) {
      setMessage('Unable to load inventory. Please sign in as a farmer.');
    }
  };

  useEffect(() => {
    if (token) loadInventory();
  }, [token]);

  const submitProduce = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/farmers/inventory', form, { headers: { Authorization: `Bearer ${token}` } });
      setInventory([response.data, ...inventory]);
      setMessage('Produce added successfully.');
      setForm({ category: 'grains', name: '', quantity: '', price: '', location: '', description: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add produce');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-center rounded-[36px] overflow-hidden shadow-glow">
        <div className="relative h-64 lg:h-80 bg-gradient-to-br from-emerald-600 to-lime-600">
          <img src="/images/img1.png" alt="Farmer marketplace tools" className="h-full w-full object-cover opacity-75 mix-blend-overlay" />
        </div>
        <div className="bg-white p-8 lg:p-10">
          <h2 className="text-3xl font-semibold text-slate-900">Farmer dashboard</h2>
          <p className="mt-4 text-lg text-slate-600">List produce, manage inventory availability, and build market access for your farm.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>✓ Add and manage product listings</p>
            <p>✓ Track inventory in real-time</p>
            <p>✓ Reach buyers across Nigeria</p>
          </div>
        </div>
      </div>
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="rounded-[36px] bg-white p-8 shadow-glow lg:col-span-1">
          <h2 className="text-2xl font-semibold text-slate-900">My Dashboard</h2>
          <p className="mt-4 text-slate-600">Manage your farm inventory and listings here.</p>
          {message && <p className="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">{message}</p>}
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-[36px] bg-white p-8 shadow-glow">
            <h3 className="text-lg font-semibold text-slate-900">New produce listing</h3>
            <form onSubmit={submitProduce} className="mt-6 grid gap-4 sm:grid-cols-2">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-3xl border border-slate-200 px-4 py-3">
                <option value="grains">Grains</option>
                <option value="vegetables">Vegetables</option>
                <option value="livestock">Livestock</option>
                <option value="fruits">Fruits</option>
                <option value="other">Other</option>
              </select>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="rounded-3xl border border-slate-200 px-4 py-3" required />
              <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} placeholder="Quantity" className="rounded-3xl border border-slate-200 px-4 py-3" required />
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (₦)" className="rounded-3xl border border-slate-200 px-4 py-3" required />
              <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="rounded-3xl border border-slate-200 px-4 py-3" required />
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="col-span-full rounded-3xl border border-slate-200 px-4 py-3" rows="4" />
              <button type="submit" className="col-span-full rounded-full bg-agrolime px-5 py-3 text-sm font-semibold text-white">Add listing</button>
            </form>
          </div>
          <div className="mt-8 rounded-[36px] bg-white p-8 shadow-glow">
            <h3 className="text-lg font-semibold text-slate-900">Inventory</h3>
            <div className="mt-6 space-y-4">
              {inventory.length ? inventory.map((item) => (
                <div key={item._id} className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{item.category}</p>
                      <h4 className="mt-2 text-xl font-semibold text-slate-900">{item.name}</h4>
                      <p className="mt-1 text-sm text-slate-600">Location: {item.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-agrogold">₦{item.price.toLocaleString()}</p>
                      <p className="text-sm text-slate-500">{item.quantity} units</p>
                    </div>
                  </div>
                </div>
              )) : <p className="text-slate-500">No inventory listed yet. Add your first produce item.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerDashboard;

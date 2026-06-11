import { useEffect, useState } from 'react';
import axios from 'axios';
import ProduceCard from '../components/ProduceCard';

const categories = ['grains', 'vegetables', 'livestock', 'fruits', 'other'];

const BuyerMarketplace = () => {
  const [produce, setProduce] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  const loadProduce = async () => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (location) params.location = location;
    if (query) params.query = query;

    const response = await axios.get('/api/buyers/produce', { params });
    setProduce(response.data);
  };

  useEffect(() => {
    loadProduce();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 grid gap-6 overflow-hidden rounded-[36px] shadow-glow">
        <div className="relative h-64 w-full bg-gradient-to-r from-emerald-600 to-emerald-500">
          <img src="/images/img2.png" alt="Browse marketplace produce" className="h-full w-full object-cover opacity-70 mix-blend-overlay" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 py-6 text-white">
            <p className="text-sm uppercase tracking-[0.3em] font-semibold text-white/90">Buyer marketplace</p>
            <h1 className="mt-3 text-4xl font-semibold">Search produce by category, location, and price.</h1>
          </div>
        </div>
      </div>
      <div className="mb-10 grid gap-6 rounded-[36px] bg-white p-8 shadow-glow">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-agrolime">Search by filters</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Find produce easily</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="rounded-3xl border border-slate-200 px-4 py-3">
            <option value="">All categories</option>
            {categories.map((category) => (<option key={category} value={category}>{category}</option>))}
          </select>
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="rounded-3xl border border-slate-200 px-4 py-3" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search crop" className="rounded-3xl border border-slate-200 px-4 py-3" />
          <button onClick={loadProduce} className="rounded-3xl bg-agrolime px-5 py-3 text-white">Search</button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {produce.length ? produce.map((item) => <ProduceCard key={item._id} produce={item} />) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-500">No produce found. Try broadening your filter.</div>
        )}
      </div>
    </section>
  );
};

export default BuyerMarketplace;

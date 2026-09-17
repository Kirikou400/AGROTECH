import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ProduceCard from '../components/ProduceCard';

const categoryPills = [
  { id: '', label: 'All Produce', icon: '🧺' },
  { id: 'grains', label: 'Grains & Cereals', icon: '🌾' },
  { id: 'vegetables', label: 'Fresh Vegetables', icon: '🥬' },
  { id: 'tubers', label: 'Tubers & Roots', icon: '🥔' },
  { id: 'fruits', label: 'Fruits & Orchards', icon: '🥭' },
  { id: 'livestock', label: 'Livestock & Fish', icon: '🐐' },
];

const BuyerMarketplace = () => {
  const [produce, setProduce] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  const loadProduce = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (location) params.location = location;
      if (query) params.query = query;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await axios.get('/api/buyers/produce', { params });
      setProduce(response.data);
    } catch (err) {
      console.error('Failed to load marketplace produce:', err);
    } finally {
      setLoading(false);
    }
  };

  // Re-run search when category or maxPrice changes, or on initial load
  useEffect(() => {
    loadProduce();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProduce();
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setLocation('');
    setQuery('');
    setMaxPrice('');
    setSortBy('default');
    // Fetch all
    axios.get('/api/buyers/produce').then((res) => setProduce(res.data));
  };

  // Sorted list
  const sortedProduce = useMemo(() => {
    const list = [...produce];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }
    if (sortBy === 'name-asc') {
      return list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return list;
  }, [produce, sortBy]);

  const hasActiveFilters = Boolean(selectedCategory || location || query || maxPrice || sortBy !== 'default');

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Banner */}
      <div className="mb-10 overflow-hidden rounded-[36px] shadow-glow bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 text-white relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative px-8 py-12 sm:px-12 sm:py-16 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-emerald-100 backdrop-blur-sm">
            Direct Farm Sourcing
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Verified Nigerian Farm Produce Marketplace
          </h1>
          <p className="mt-3 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            Source bulk grains, fresh highland vegetables, export-grade tubers, and livestock straight from vetted regional farmers with temperature-monitored logistics.
          </p>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categoryPills.map((pill) => {
          const isActive = selectedCategory === pill.id;
          return (
            <button
              key={pill.id}
              onClick={() => setSelectedCategory(pill.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-agrolime text-white border-agrolime shadow-md shadow-emerald-700/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-agrolime/60 hover:bg-slate-50'
              }`}
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-10 rounded-[32px] bg-white p-6 shadow-glow border border-slate-200/80">
        <form onSubmit={handleSearchSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by crop name or keyword..."
              className="w-full rounded-2xl border border-slate-200 pl-4 pr-10 py-3 text-sm text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-3.5 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <div>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Filter by state (e.g. Kano, Benue)..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
            />
          </div>

          <div>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max price (₦)"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-agrolime px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 transition"
            >
              Filter Crops
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="rounded-2xl border border-slate-300 px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition whitespace-nowrap"
                title="Reset all filters"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Bottom Sorting Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
          <p>
            Showing <strong className="text-slate-800">{sortedProduce.length}</strong> available crops
            {selectedCategory ? ` in ${selectedCategory}` : ''}
          </p>

          <div className="flex items-center gap-2">
            <label className="font-medium text-slate-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-700 focus:border-agrolime"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Produce Grid */}
      {loading ? (
        <div className="rounded-[36px] bg-white p-16 text-center shadow-glow border border-slate-200/80">
          <svg className="animate-spin mx-auto h-8 w-8 text-agrolime mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-sm font-medium text-slate-600">Loading fresh marketplace produce...</p>
        </div>
      ) : sortedProduce.length ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedProduce.map((item) => (
            <ProduceCard key={item._id || item.id} produce={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[36px] border border-dashed border-slate-300 bg-white p-16 text-center shadow-glow">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 mb-4 text-2xl">
            🌾
          </div>
          <h3 className="text-lg font-bold text-slate-900">No produce matching your criteria</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
            Try broadening your search query, increasing your maximum budget, or selecting "All Produce".
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-agrolime px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default BuyerMarketplace;

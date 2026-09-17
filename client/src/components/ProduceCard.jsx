import { useContext, useState } from 'react';
import CartContext from '../context/CartContext';

const categoryBadges = {
  grains: { bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: '🌾' },
  vegetables: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: '🥬' },
  fruits: { bg: 'bg-orange-100 text-orange-800 border-orange-200', icon: '🥭' },
  tubers: { bg: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🥔' },
  livestock: { bg: 'bg-stone-100 text-stone-800 border-stone-200', icon: '🐐' },
  other: { bg: 'bg-slate-100 text-slate-800 border-slate-200', icon: '🌱' },
};

const ProduceCard = ({ produce }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const categoryInfo = categoryBadges[produce.category?.toLowerCase()] || categoryBadges.other;

  const handleAdd = () => {
    addToCart(produce);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const sellerName = produce.seller?.name || 'Verified Farmer';

  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${categoryInfo.bg}`}>
            <span>{categoryInfo.icon}</span>
            <span>{produce.category}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {produce.location || 'Nigeria'}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-agrolime transition-colors">
          {produce.name}
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {produce.description || 'Premium farm produce harvested fresh from verified regional growers.'}
        </p>

        {/* Farmer info */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>Sold by <strong className="font-medium text-slate-700">{sellerName}</strong></span>
        </div>
      </div>

      {/* Footer: Price & Add to Cart */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-slate-900">
              ₦{(Number(produce.price) || 0).toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 ml-1">/ unit</span>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            {produce.quantity} in stock
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-sm font-semibold transition-all duration-200 shadow-sm ${
            added
              ? 'bg-emerald-600 text-white shadow-emerald-200'
              : 'bg-agrolime hover:bg-emerald-700 text-white hover:shadow-md'
          }`}
        >
          {added ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProduceCard;

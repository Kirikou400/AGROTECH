import { useContext } from 'react';
import CartContext from '../context/CartContext';

const ProduceCard = ({ produce }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-glow transition hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-slate-500">
        <span className="text-agrolime font-semibold">{produce.category}</span>
        <span>{produce.location}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{produce.name}</h3>
      <p className="mt-3 text-slate-600 max-h-14 overflow-hidden text-sm">{produce.description || 'Quality produce from trusted farmers.'}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-lg font-semibold text-agrogold">₦{produce.price.toLocaleString()}</span>
        <span className="text-sm text-slate-500">{produce.quantity} units</span>
      </div>
      <button onClick={() => addToCart(produce)} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-agrolime px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600">
        Add to cart
      </button>
    </div>
  );
};

export default ProduceCard;

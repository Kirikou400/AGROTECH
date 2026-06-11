import { useContext } from 'react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';
import OrderSummary from '../components/OrderSummary';

const Checkout = () => {
  const { items } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-[36px] bg-white p-8 shadow-glow">
            <h2 className="text-2xl font-semibold text-slate-900">Checkout</h2>
            {!user && <p className="mt-4 rounded-3xl bg-amber-50 p-4 text-sm text-amber-700">Sign in to complete your purchase.</p>}
            <div className="mt-6 space-y-4">
              {items.length ? items.map((item) => (
                <div key={item._id} className="rounded-3xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-500">{item.category} · {item.location}</p>
                    </div>
                    <span className="text-slate-700">{item.quantity} x ₦{item.price.toLocaleString()}</span>
                  </div>
                </div>
              )) : <p className="text-slate-500">Your cart is empty. Add items from the marketplace.</p>}
            </div>
          </div>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </section>
  );
};

export default Checkout;

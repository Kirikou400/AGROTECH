import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
    <h1 className="text-5xl font-bold text-slate-900">404</h1>
    <p className="mt-4 text-lg text-slate-600">Page not found. Return to the marketplace or farmer dashboard.</p>
    <div className="mt-8 flex justify-center gap-4">
      <Link to="/" className="rounded-full bg-agrolime px-6 py-3 text-white">Home</Link>
      <Link to="/marketplace" className="rounded-full border border-slate-200 px-6 py-3 text-slate-700">Marketplace</Link>
    </div>
  </section>
);

export default NotFound;

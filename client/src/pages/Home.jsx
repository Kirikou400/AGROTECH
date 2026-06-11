import { Link } from 'react-router-dom';

const Home = () => (
  <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-600 py-20 text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm uppercase tracking-[0.35em] text-white/80">Arab's AgroTech Hub</p>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight sm:text-6xl">Smart agricultural commerce for farmers, buyers, and service partners.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">Grow your agribusiness with a trusted Nigerian marketplace, logistics support, and payment tools built for modern farming.</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/farmer" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-slate-100">Farmer Dashboard</Link>
            <Link to="/marketplace" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Explore Marketplace</Link>
          </div>
          <div className="mt-8 rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.35em] text-white/80">New to Arab's AgroTech Hub?</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Create your buyer or farmer account now.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">Register as the right role and start buying produce or listing farm products instantly.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link to="/register?role=farmer" className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-emerald-700 transition hover:bg-slate-100">Sign up as Farmer</Link>
              <Link to="/register?role=buyer" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/20">Sign up as Buyer</Link>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="overflow-hidden rounded-[36px] border border-white/15 bg-white/15 shadow-2xl shadow-slate-950/10">
            <img src="/images/img1.png" alt="Arab's AgroTech Hub agricultural marketplace" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-[36px] bg-white/95 p-6 shadow-2xl shadow-slate-950/10 text-slate-900">
            <div className="flex items-center gap-4">
              <img src="/images/logo.png" alt="Arab's AgroTech Hub logo" className="h-14 w-14 rounded-full object-cover ring-2 ring-agrolime/40" />
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-agrolime">Trusted by Nigerian farmers</p>
                <p className="mt-2 text-2xl font-semibold">Join our growing agri community</p>
              </div>
            </div>
            <img src="/images/img2.png" alt="Arab's AgroTech Hub community and marketplace" className="mt-6 w-full rounded-3xl object-cover" />
            <p className="mt-4 text-sm leading-6 text-slate-600">Stay connected on WhatsApp for market updates, farm tips, and events from Arab's AgroTech Hub.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Home;

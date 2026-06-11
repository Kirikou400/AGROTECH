import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-200 py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <img src="/images/logo.png" alt="Arab's AgroTech Hub logo" className="h-14 w-14 rounded-full object-cover ring-2 ring-agrolime/40" />
        <div>
          <h3 className="text-xl font-semibold text-white">Arab's AgroTech Hub</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Connecting Nigerian farmers, buyers, and service partners with a trusted agritech marketplace, logistics, and support tools.</p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">Explore</h4>
        <div className="mt-3 space-y-2 text-sm text-slate-300">
          <Link to="/marketplace" className="block hover:text-white">Marketplace</Link>
          <Link to="/farmer" className="block hover:text-white">Farmer hub</Link>
          <Link to="/blog" className="block hover:text-white">Blog</Link>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white">Connect</h4>
        <p className="mt-3 text-sm text-slate-300">Join our WhatsApp and Telegram groups for farming tips, events, and support.</p>
        <p className="mt-4 text-sm text-slate-400">© 2026 Arab's AgroTech Hub</p>
      </div>
    </div>
  </footer>
);

export default Footer;

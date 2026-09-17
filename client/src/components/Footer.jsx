import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-200 pt-16 pb-12 border-t border-slate-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {/* Brand Column */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Arab's AgroTech Hub logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-agrolime/50"
          />
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">Arab's AgroTech Hub</h3>
            <p className="text-xs text-agrolime font-medium">Connecting Farmers To The Future</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-slate-400">
          Empowering Nigerian farmers with smart digital commerce, reliable cold-chain logistics, and verified buyer networks across all 36 states.
        </p>
        <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Nigeria Agritech Network · Operational 24/7</span>
        </div>
      </div>

      {/* Explore Marketplace */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Marketplace & Hubs</h4>
        <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
          <li>
            <Link to="/marketplace" className="hover:text-emerald-400 transition-colors">
              Browse Produce Marketplace
            </Link>
          </li>
          <li>
            <Link to="/farmer" className="hover:text-emerald-400 transition-colors">
              Farmer Inventory Portal
            </Link>
          </li>
          <li>
            <Link to="/checkout" className="hover:text-emerald-400 transition-colors">
              Buyer Cart & Checkout
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-emerald-400 transition-colors">
              Agri-Business Support & Grants
            </Link>
          </li>
          <li>
            <Link to="/insights" className="hover:text-emerald-400 transition-colors">
              Market Trends & Analytics
            </Link>
          </li>
        </ul>
      </div>

      {/* Community & Learning */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Community & Growth</h4>
        <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
          <li>
            <Link to="/community" className="hover:text-emerald-400 transition-colors">
              Farmer WhatsApp & Telegram Groups
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:text-emerald-400 transition-colors">
              Agritech Webinars & Clinics
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-emerald-400 transition-colors">
              Crop Forecasts & Agritech News
            </Link>
          </li>
          <li>
            <Link to="/register?role=farmer" className="hover:text-emerald-400 transition-colors">
              Register as Producer
            </Link>
          </li>
          <li>
            <Link to="/register?role=buyer" className="hover:text-emerald-400 transition-colors">
              Register as Commercial Buyer
            </Link>
          </li>
        </ul>
      </div>

      {/* Regional Contact & Coverage */}
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Regional Support</h4>
        <div className="mt-4 space-y-3 text-sm text-slate-400">
          <p className="flex items-start gap-2">
            <span className="text-agrogold font-bold">HQ:</span>
            <span>Plot 42, Agribusiness Corridor, Central Area, Abuja FCT</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">North:</span>
            <span>Kano Grain Exchange Hub, Bompai Industrial Estate</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">South:</span>
            <span>Ikeja Cold-Chain Transit Terminal, Lagos</span>
          </p>
          <p className="pt-2 text-xs text-slate-500">
            Helpline: <span className="text-slate-300 font-medium">+234 (0) 800-AGRO-HUB</span>
          </p>
        </div>
      </div>
    </div>

    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
      <p>© {new Date().getFullYear()} Arab's AgroTech Hub. All rights reserved.</p>
      <div className="flex items-center gap-6">
        <Link to="/services" className="hover:text-slate-400">Terms of Service</Link>
        <Link to="/services" className="hover:text-slate-400">Privacy Policy</Link>
        <Link to="/community" className="hover:text-slate-400">Contact Support</Link>
      </div>
    </div>
  </footer>
);

export default Footer;

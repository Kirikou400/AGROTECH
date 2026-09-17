import { Link } from 'react-router-dom';

const stats = [
  { value: '410+', label: 'Verified Farmers', desc: 'Across northern & southern food belts' },
  { value: '₦120M+', label: 'Produce Traded', desc: 'Secure escrow transactions settled' },
  { value: '36', label: 'States Covered', desc: 'Nationwide cold-chain transport' },
  { value: '99.2%', label: 'Order Fulfillment', desc: 'Low post-harvest loss rate' },
];

const features = [
  {
    icon: '🌾',
    title: 'Direct Farm Gate Pricing',
    desc: 'Bypass exploitative middlemen. Farmers sell directly to supermarkets, food processors, and wholesale buyers at true market value.',
  },
  {
    icon: '❄️',
    title: 'Cold-Chain & Freight Logistics',
    desc: 'Integrated temperature-monitored courier and haulage partners prevent spoilage for perishable vegetables, fruits, and table fish.',
  },
  {
    icon: '🛡️',
    title: 'Escrow Payment Protection',
    desc: 'Pay safely with Paystack or Flutterwave. Buyer payments are held securely in escrow until harvest delivery is verified.',
  },
  {
    icon: '🛰️',
    title: 'Precision Agritech & Drone Tools',
    desc: 'Leverage IoT soil diagnostics, aerial drone mapping, and forward commodity demand forecasts to maximize your farm yield.',
  },
];

const categories = [
  { id: 'grains', name: 'Grains & Cereals', icon: '🌾', count: 'Maize, Sorghum, Rice, Soya', color: 'from-amber-500 to-amber-600' },
  { id: 'vegetables', name: 'Fresh Vegetables', icon: '🥬', count: 'Bell Peppers, Spinach, Tomatoes', color: 'from-emerald-600 to-teal-600' },
  { id: 'tubers', name: 'Tubers & Roots', icon: '🥔', count: 'Benue Pona Yam, Cassava', color: 'from-yellow-600 to-amber-700' },
  { id: 'fruits', name: 'Fresh Orchards', icon: '🥭', count: 'Ogbomoso Mango, Citrus', color: 'from-orange-500 to-amber-600' },
  { id: 'livestock', name: 'Livestock & Fish', icon: '🐐', count: 'Sahel Goats, Smoked Catfish', color: 'from-stone-600 to-stone-700' },
];

const Home = () => (
  <div className="space-y-16 sm:space-y-24 pb-16">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-lime-800 py-16 sm:py-24 text-white">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-200 backdrop-blur-md">
              <span>🇳🇬</span>
              <span>Empowering Nigerian Agriculture</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Smart commerce for farmers, bulk buyers & agro-logistics.
            </h1>

            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-emerald-100/90 font-normal">
              Arab’s AgroTech Hub connects verified Nigerian growers directly with commercial off-takers, cold-chain transport, and secure escrow payments.
            </p>

            <div className="flex flex-wrap gap-3.5 pt-2">
              <Link
                to="/marketplace"
                className="rounded-full bg-agrogold px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-yellow-950/20 transition hover:bg-yellow-400 hover:scale-105 transform duration-200"
              >
                Explore Marketplace →
              </Link>
              <Link
                to="/farmer"
                className="rounded-full bg-white/15 backdrop-blur-md border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/25 hover:border-white"
              >
                Farmer Hub Portal
              </Link>
            </div>

            {/* Quick Registration Card */}
            <div className="mt-8 rounded-[32px] border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-emerald-200">
                Join 1,000+ Agri-Entrepreneurs
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">Start buying or selling farm produce today.</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  to="/register?role=farmer"
                  className="rounded-full bg-white py-3 text-center text-xs font-bold text-emerald-800 shadow-md transition hover:bg-emerald-50"
                >
                  🌾 Register as Farmer
                </Link>
                <Link
                  to="/register?role=buyer"
                  className="rounded-full border border-white/30 bg-white/10 py-3 text-center text-xs font-bold text-white transition hover:bg-white/20"
                >
                  🛒 Register as Buyer
                </Link>
              </div>
            </div>
          </div>

          {/* Right Hero Images */}
          <div className="lg:col-span-5 space-y-4">
            <div className="overflow-hidden rounded-[36px] border border-white/20 bg-white/10 shadow-2xl shadow-emerald-950/40 transform hover:scale-[1.01] transition duration-300">
              <img
                src="/images/img1.png"
                alt="Arab's AgroTech Hub agricultural trade"
                className="h-64 sm:h-72 w-full object-cover"
              />
            </div>

            <div className="rounded-[36px] bg-white p-6 shadow-2xl shadow-emerald-950/20 text-slate-900 border border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="Arab's AgroTech Hub logo"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-agrolime/30"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-agrolime">Verified Network</p>
                  <p className="text-lg font-bold text-slate-900">National Agro-Cooperative</p>
                </div>
              </div>
              <img
                src="/images/img2.png"
                alt="Arab's AgroTech Hub community members"
                className="mt-4 h-44 w-full rounded-2xl object-cover"
              />
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                Connecting growers in Kano, Plateau, Benue, Kaduna and Oyo directly with premium food distributors in Lagos, Abuja and Port Harcourt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Platform Impact Stats */}
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[32px] border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-md transition text-center"
          >
            <p className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</p>
            <p className="mt-1.5 text-sm font-bold text-agrolime">{stat.label}</p>
            <p className="mt-1 text-xs text-slate-500">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Core Features: Why Choose Arab's AgroTech Hub */}
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-agrolime bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
          Our Value Proposition
        </span>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Built Specifically for the Realities of Nigerian Agribusiness
        </h2>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          From farm-gate price transparency to refrigerated transport and prompt escrow settlement, we eliminate the friction in agricultural trade.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feat) => (
          <div
            key={feat.title}
            className="flex flex-col justify-between rounded-[32px] border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl mb-5">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{feat.desc}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-agrolime flex items-center gap-1">
                <span>Learn more</span>
                <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Popular Crop Categories */}
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-agrolime">Browse Harvests</span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900">Explore Crop Categories</h2>
        </div>
        <Link
          to="/marketplace"
          className="text-xs font-bold text-agrolime hover:text-emerald-700 inline-flex items-center gap-1"
        >
          <span>View All Produce in Marketplace</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/marketplace?category=${cat.id}`}
            className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">{cat.icon}</div>
            <h3 className="font-bold text-sm text-slate-900 group-hover:text-agrolime transition-colors">
              {cat.name}
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-tight">{cat.count}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* How It Works Workflow */}
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[40px] bg-slate-900 p-8 sm:p-14 text-white shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800">
            Simple 3-Step Process
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">How Arab's AgroTech Hub Works</h2>
          <p className="mt-2 text-sm text-slate-400">
            Transparent, safe, and efficient transactions for both producers and commercial off-takers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* For Farmers */}
          <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <span>🌾</span>
              <span>For Farmers & Cooperatives</span>
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400">1</span>
                <p><strong className="text-white">Register & List:</strong> Create your profile and publish your available crop quantities with price and farm location.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400">2</span>
                <p><strong className="text-white">Confirm Orders:</strong> Receive instant notifications when buyers place orders backed by verified escrow funds.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400">3</span>
                <p><strong className="text-white">Dispatch & Get Paid:</strong> Hand over produce to our vetted logistics partner and receive direct bank transfer settlement.</p>
              </div>
            </div>
            <Link to="/farmer" className="inline-block mt-2 text-xs font-bold text-emerald-400 hover:underline">
              Access Farmer Hub →
            </Link>
          </div>

          {/* For Buyers */}
          <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-agrogold flex items-center gap-2">
              <span>🛒</span>
              <span>For Commercial Off-Takers & Retailers</span>
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 font-bold text-agrogold">1</span>
                <p><strong className="text-white">Browse Produce:</strong> Filter certified grains, roots, and produce by category, state location, and price.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 font-bold text-agrogold">2</span>
                <p><strong className="text-white">Checkout with Escrow:</strong> Select farm pickup or cold-chain delivery and pay safely through Paystack or Flutterwave.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 font-bold text-agrogold">3</span>
                <p><strong className="text-white">Inspect & Receive:</strong> Receive produce at your warehouse. Funds release to farmer only upon confirmed delivery.</p>
              </div>
            </div>
            <Link to="/marketplace" className="inline-block mt-2 text-xs font-bold text-agrogold hover:underline">
              Browse Marketplace Crops →
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Community & WhatsApp Banner */}
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Connect & Grow Together
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Join the Arab's AgroTech Hub Farmer Community
          </h2>
          <p className="text-sm text-emerald-100/90 leading-relaxed">
            Get daily wholesale market price bulletins, weather warnings, pest management tips, and direct networking with institutional buyers across Nigeria.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            to="/community"
            className="rounded-full bg-white px-6 py-3 text-xs font-bold text-emerald-800 shadow-md hover:bg-slate-100 transition whitespace-nowrap"
          >
            💬 Join WhatsApp & Telegram
          </Link>
          <Link
            to="/events"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-xs font-bold text-white hover:bg-white/20 transition whitespace-nowrap"
          >
            📅 Upcoming Webinars
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default Home;

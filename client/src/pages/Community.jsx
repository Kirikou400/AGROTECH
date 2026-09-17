import { useState } from 'react';

const channels = [
  {
    icon: '💬',
    title: 'Farmer WhatsApp Community',
    desc: 'Join 1,800+ active Nigerian farmers sharing daily market commodity prices, weather alerts, and crop protection advice.',
    actionText: 'Connect on WhatsApp',
    link: 'https://chat.whatsapp.com/sample-agrotech-hub',
    badge: '1,840 Active Members',
  },
  {
    icon: '📢',
    title: 'Telegram Broadcast Channel',
    desc: 'Official instant updates on government agricultural subsidies, BOA credit windows, export opportunities, and logistics alerts.',
    actionText: 'Join Telegram Channel',
    link: 'https://t.me/sample_agrotech_hub',
    badge: 'Daily Market Bulletins',
  },
  {
    icon: '🤝',
    title: 'Wholesale Buyer & Off-Taker Forum',
    desc: 'Direct B2B group for institutional buyers, supermarkets, FMCG processors, and restaurant chains sourcing bulk produce.',
    actionText: 'Request Buyer Access',
    link: 'mailto:buyers@agrotechhub.ng?subject=Wholesale%20Buyer%20Access%20Request',
    badge: 'Verified Commercial Off-Takers',
  },
];

const Community = () => {
  const [joinedChannel, setJoinedChannel] = useState('');

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-10 rounded-[36px] bg-gradient-to-r from-emerald-800 to-lime-800 p-8 sm:p-12 text-white shadow-glow">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-emerald-100">
          Peer-to-Peer Growth
        </span>
        <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
          Agri-Community & Cooperative Network
        </h1>
        <p className="mt-3 text-base text-emerald-100/90 max-w-2xl leading-relaxed">
          Nigeria’s fastest-growing digital agriculture ecosystem. Connect with peer growers, certified agronomists, logistics operators, and commercial off-takers.
        </p>
      </div>

      {joinedChannel && (
        <div className="mb-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex items-center justify-between">
          <span>Invitation request registered for {joinedChannel}. Connecting to channel...</span>
          <button onClick={() => setJoinedChannel('')} className="text-emerald-600">✕</button>
        </div>
      )}

      {/* Channels Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {channels.map((channel) => (
          <div
            key={channel.title}
            className="flex flex-col justify-between rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{channel.icon}</span>
                <span className="text-[10px] uppercase font-bold text-agrolime bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {channel.badge}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{channel.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{channel.desc}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <a
                href={channel.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => setJoinedChannel(channel.title)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-agrolime py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
              >
                <span>{channel.actionText}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Community Code & Standards */}
      <div className="mt-12 rounded-[36px] bg-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <h3 className="text-xl font-bold text-emerald-400">Community Standards & Fair Trade Pledge</h3>
        <p className="mt-2 text-xs text-slate-400 max-w-2xl">
          To maintain trust and safety across our digital groups, all members agree to our transparent communication guidelines:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white mb-1">1. Verified Identity</h4>
            <p>Every member is linked to their registered farmer or buyer profile with phone verification.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white mb-1">2. Price Transparency</h4>
            <p>Market quotes reflect real-world wholesale rates without hidden middleman fees.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-white mb-1">3. Zero Toleration for Fraud</h4>
            <p>All financial trades must be executed through the platform escrow for full protection.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;

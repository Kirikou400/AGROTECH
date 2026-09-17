import { useState } from 'react';

const servicesList = [
  {
    icon: '📋',
    title: 'Farm Business Registration & Compliance',
    desc: 'End-to-end guidance for registering your farm cooperative or agribusiness enterprise with CAC (Corporate Affairs Commission), NAFDAC, and SMEDAN.',
    benefits: ['CAC Certificate in 7 days', 'Tax Identification Number (TIN)', 'Export license advisory'],
  },
  {
    icon: '💰',
    title: 'Agri-Credit & Grant Facilitation',
    desc: 'Assistance in assembling bank-ready business plans, financial projections, and credit profiles for Bank of Agriculture (BOA) and Commercial Bank agro-loans.',
    benefits: ['Grant proposal drafting', 'Credit risk assessment', 'Investor pitch deck preparation'],
  },
  {
    icon: '🛰️',
    title: 'IoT Drone Mapping & Soil Diagnostics',
    desc: 'Precision agricultural surveys using high-resolution multispectral drones to detect crop stress, nitrogen deficiency, and moisture distribution across your fields.',
    benefits: ['Centimeter-accurate field borders', 'Moisture zone mapping', 'Yield estimation reports'],
  },
  {
    icon: '📦',
    title: 'Cold-Chain Consolidation & Packaging',
    desc: 'Access regional refrigerated collection centers and food-grade packaging that extend produce shelf-life and meet export retail requirements.',
    benefits: ['Refrigerated transit bookings', 'Perishable crates supply', 'Pre-cooling terminal access'],
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', farmLocation: '', notes: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setSelectedService(null);
    setForm({ name: '', phone: '', email: '', farmLocation: '', notes: '' });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-10 rounded-[36px] bg-gradient-to-r from-emerald-800 to-lime-800 p-8 sm:p-12 text-white shadow-glow">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-emerald-100">
          Enterprise Advisory
        </span>
        <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
          Agribusiness Support & Technical Services
        </h1>
        <p className="mt-3 text-base text-emerald-100/90 max-w-2xl leading-relaxed">
          Accelerate your commercial agricultural venture with professional business registration, precision IoT drone mapping, grant advisory, and cold storage access.
        </p>
      </div>

      {inquirySent && (
        <div className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-emerald-900">Inquiry Received!</h3>
            <p className="text-xs text-emerald-700 mt-1">
              An Arab’s AgroTech Hub agricultural consultant will reach out to you via WhatsApp / Phone within 24 business hours.
            </p>
          </div>
          <button
            onClick={() => setInquirySent(false)}
            className="rounded-full bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
          >
            Close
          </button>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {servicesList.map((srv) => (
          <div
            key={srv.title}
            className="flex flex-col justify-between rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl mb-4">
                {srv.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-900">{srv.title}</h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{srv.desc}</p>

              <div className="mt-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-agrolime">Key Deliverables:</p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {srv.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedService(srv)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-agrolime py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
              >
                <span>Request Consultation</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Consultation Request */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-lg rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-agrolime">Service Consultation</span>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">{selectedService.title}</h3>
            <p className="text-xs text-slate-500 mt-1">Please provide your details so an agribusiness specialist can connect with you.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Aliko Mohammed"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="080..."
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State / Location</label>
                  <input
                    value={form.farmLocation}
                    onChange={(e) => setForm({ ...form, farmLocation: e.target.value })}
                    placeholder="e.g. Kano, Benue"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Farm Needs or Questions</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Tell us about your farm size, crop type, or required assistance..."
                  className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-slate-800 bg-slate-50/50"
                  rows="2"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-agrolime py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Submit Consultation Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

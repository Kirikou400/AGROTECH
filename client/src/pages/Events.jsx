import { useState } from 'react';

const events = [
  {
    id: 'irrigation',
    title: 'Precision Drip Irrigation & Solar Pumping Clinic',
    date: 'October 15, 2026',
    time: '11:00 AM WAT (Zoom Live)',
    speaker: 'Engr. Haruna Bello (AgroSolar Africa)',
    category: 'Water Conservation',
    details: 'Practical engineering walkthrough on installing low-cost gravity drip irrigation kits and solar pumps for dry-season vegetable farming in the Sahel and Middle Belt.',
  },
  {
    id: 'export',
    title: 'Nigerian Crop Export Compliance & Standards',
    date: 'October 28, 2026',
    time: '2:00 PM WAT (Live Stream)',
    speaker: 'Dr. Chioma Nwachukwu (NAFDAC & NEPC Advisor)',
    category: 'Trade & Certification',
    details: 'Essential grading criteria, maximum residue limits (MRLs), moisture thresholds, and phytosanitary certificates required to export yam tubers, sesame, and ginger.',
  },
  {
    id: 'fintech',
    title: 'Digital Payments & Invoice Financing Clinic',
    date: 'November 12, 2026',
    time: '4:00 PM WAT (Interactive Workshop)',
    speaker: 'Tunde Ibrahim (AgroTech Fintech Lead)',
    category: 'Agri-Finance',
    details: 'Learn how to utilize verified Arab’s AgroTech Hub sales receipts and escrow history to qualify for zero-collateral input financing from participating partner banks.',
  },
];

const Events = () => {
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [successEvent, setSuccessEvent] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessEvent(registeredEvent);
    setRegisteredEvent(null);
    setEmail('');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-10 rounded-[36px] bg-gradient-to-r from-emerald-800 to-teal-800 p-8 sm:p-12 text-white shadow-glow">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-emerald-100">
          Capacity Building
        </span>
        <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
          Monthly Webinars & Agritech Masterclasses
        </h1>
        <p className="mt-3 text-base text-emerald-100/90 max-w-2xl leading-relaxed">
          Free digital workshops featuring certified agronomists, export certifiers, and agricultural financiers to empower smallholders and agribusiness managers.
        </p>
      </div>

      {successEvent && (
        <div className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-emerald-900">Registration Confirmed!</h3>
            <p className="text-xs text-emerald-700 mt-1">
              You have secured your seat for <strong>{successEvent.title}</strong> on {successEvent.date}. Calendar invite and Zoom connection details have been sent.
            </p>
          </div>
          <button
            onClick={() => setSuccessEvent(null)}
            className="rounded-full bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-200"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-agrolime bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    {event.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    📅 {event.date} · ⏰ {event.time}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{event.title}</h2>
                <p className="text-xs font-semibold text-slate-700">Speaker: {event.speaker}</p>
                <p className="text-sm text-slate-600 leading-relaxed pt-1">{event.details}</p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
                <span className="rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
                  Free Live Session
                </span>
                <button
                  onClick={() => setRegisteredEvent(event)}
                  className="rounded-full bg-agrolime hover:bg-emerald-700 px-6 py-3 text-xs font-bold text-white shadow-md transition"
                >
                  Reserve My Seat →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Registration Modal */}
      {registeredEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-agrolime">Webinar Registration</span>
              <button
                onClick={() => setRegisteredEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="mt-4 text-xl font-bold text-slate-900">{registeredEvent.title}</h3>
            <p className="text-xs text-slate-500 mt-1">📅 {registeredEvent.date} at {registeredEvent.time}</p>

            <form onSubmit={handleRegister} className="mt-6 space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. farmer@example.com"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-agrolime py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
              >
                Confirm Free Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;

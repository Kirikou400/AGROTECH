const events = [
  { title: 'Monthly Webinar: Smart Irrigation', date: 'June 25, 2026', details: 'Live session with agritech experts on water-efficient farming.' },
  { title: 'Farmers Meet & Connect', date: 'July 10, 2026', details: 'Networking event for buyers, logistics partners, and producers.' },
  { title: 'Digital Payments clinic', date: 'July 28, 2026', details: 'Training on Paystack and Flutterwave integration for Nigerian vendors.' },
];

const Events = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="rounded-[36px] bg-white p-10 shadow-glow">
      <h1 className="text-3xl font-semibold text-slate-900">Monthly webinars & events</h1>
      <p className="mt-4 text-slate-600">Stay updated with training sessions, market briefings, and farm support workshops.</p>
      <div className="mt-10 space-y-6">
        {events.map((event) => (
          <div key={event.title} className="rounded-3xl border border-slate-200 p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
                <p className="mt-1 text-slate-500">{event.date}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Free registration</span>
            </div>
            <p className="mt-4 text-slate-600">{event.details}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Events;

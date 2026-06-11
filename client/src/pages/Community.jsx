const Community = () => (
  <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="rounded-[36px] bg-white p-10 shadow-glow">
      <h1 className="text-3xl font-semibold text-slate-900">Community & networking</h1>
      <p className="mt-4 text-slate-600">Join our active agriculture community with chat groups, industry updates, and local meetups.</p>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">WhatsApp group</h2>
          <p className="mt-3 text-slate-600">Connect with farmers, buyers, and logistics partners instantly.</p>
          <a href="#" className="mt-4 inline-flex text-agrolime hover:text-emerald-700">Join WhatsApp group →</a>
        </div>
        <div className="rounded-3xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Telegram channel</h2>
          <p className="mt-3 text-slate-600">Receive market updates, events, and support resources.</p>
          <a href="#" className="mt-4 inline-flex text-agrolime hover:text-emerald-700">Join Telegram channel →</a>
        </div>
        <div className="rounded-3xl border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Group networking</h2>
          <p className="mt-3 text-slate-600">Collaborate with buyers, partners, and community advisors.</p>
          <a href="#" className="mt-4 inline-flex text-agrolime hover:text-emerald-700">Learn more →</a>
        </div>
      </div>
    </div>
  </section>
);

export default Community;

import { useEffect, useState } from 'react';
import axios from 'axios';

const articleTags = [
  'Technology & Drones',
  'Grants & Capital',
  'Market Intelligence',
  'Cold-Chain & Storage',
];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await axios.get('/api/blog/posts');
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-10 rounded-[36px] bg-gradient-to-r from-emerald-800 to-teal-800 p-8 sm:p-12 text-white shadow-glow">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/20 text-emerald-100">
          Knowledge & Intelligence
        </span>
        <h1 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight">
          Nigerian Agritech News & Market Forecasts
        </h1>
        <p className="mt-3 text-base text-emerald-100/90 max-w-2xl leading-relaxed">
          Actionable updates on seasonal crop demand, grain commodity pricing, grant funding opportunities, and precision farming technologies.
        </p>
      </div>

      {/* Blog Cards Grid */}
      {loading ? (
        <div className="rounded-[36px] bg-white p-16 text-center shadow-glow border border-slate-200">
          <svg className="animate-spin mx-auto h-8 w-8 text-agrolime mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-sm font-medium text-slate-600">Gathering market insights...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post, idx) => {
            const postId = post.id || post._id || `blog-${idx}`;
            const tag = articleTags[idx % articleTags.length];
            const dateStr = post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })
              : 'Recent Update';

            return (
              <article
                key={postId}
                className="flex flex-col justify-between rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span className="font-bold uppercase tracking-wider text-agrolime bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {tag}
                    </span>
                    <span>{dateStr} · 4 min read</span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 hover:text-agrolime transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Arab's AgroTech Hub Research Team</span>
                  <button
                    onClick={() => setActiveArticle({ ...post, tag, dateStr })}
                    className="inline-flex items-center gap-1 text-sm font-bold text-agrolime hover:text-emerald-700 group transition"
                  >
                    <span>Read Article</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[36px] bg-white p-8 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-agrolime bg-emerald-50 px-3 py-1 rounded-full">
                {activeArticle.tag}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {activeArticle.title}
            </h2>

            <p className="mt-2 text-xs text-slate-400">
              Published on {activeArticle.dateStr} by Arab’s AgroTech Hub Insights Desk
            </p>

            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-6">
              <p className="font-semibold text-slate-900">
                {activeArticle.excerpt}
              </p>
              <p>
                {activeArticle.content || 'Content is being synced from the field research desk.'}
              </p>
              <p className="text-slate-600">
                Farmers and commercial agribusiness operators seeking technical assistance or cooperative onboarding for these practices are encouraged to connect with our regional extension agents through the WhatsApp community or Business Support portal.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;

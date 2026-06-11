import { useEffect, useState } from 'react';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      const response = await axios.get('/api/blog/posts');
      setPosts(response.data);
    };
    loadPosts();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-white p-10 shadow-glow">
        <h1 className="text-3xl font-semibold text-slate-900">Agri news & market updates</h1>
        <p className="mt-4 text-slate-600">Stay informed with insights on crop demand, pricing, and technology trends.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {posts.length ? posts.map((post) => (
            <article key={post._id} className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-3 text-sm text-slate-500">{new Date(post.publishedAt).toLocaleDateString()}</p>
              <p className="mt-4 text-slate-600">{post.excerpt}</p>
            </article>
          )) : <p className="text-slate-500">Loading blog updates...</p>}
        </div>
      </div>
    </section>
  );
};

export default Blog;

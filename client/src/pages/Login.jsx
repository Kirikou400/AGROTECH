import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', form);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-white p-10 shadow-glow">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Arab's AgroTech Hub logo" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Sign in to Arab's AgroTech Hub</h1>
            <p className="text-sm text-slate-500">Access farmer tools, buyer checkout, and analytics.</p>
          </div>
        </div>
        {error && <div className="mt-6 rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
        <form onSubmit={submit} className="mt-8 space-y-5">
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email" className="w-full rounded-3xl border border-slate-200 px-4 py-4" required />
          <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" className="w-full rounded-3xl border border-slate-200 px-4 py-4" required />
          <button type="submit" className="w-full rounded-full bg-agrolime px-6 py-4 text-sm font-semibold text-white">Sign in</button>
        </form>
        <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
          New here? <Link to="/register?role=buyer" className="font-semibold text-agrolime hover:text-emerald-700">Sign up as a buyer</Link> or <Link to="/register?role=farmer" className="font-semibold text-agrolime hover:text-emerald-700">sign up as a farmer</Link>.
        </div>
      </div>
    </section>
  );
};

export default Login;

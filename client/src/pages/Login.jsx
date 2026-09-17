import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const demoAccounts = [
  { role: 'farmer', title: 'Amina Bello (Farmer)', email: 'amina@example.com', pass: 'farmer123', icon: '🌾' },
  { role: 'buyer', title: 'Chinedu Okeke (Buyer)', email: 'chinedu@example.com', pass: 'buyer123', icon: '🛒' },
  { role: 'admin', title: 'Tunde Ibrahim (Admin)', email: 'tunde@example.com', pass: 'admin123', icon: '⚡' },
];

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/login', form);
      login(response.data.user, response.data.token);
      if (response.data.user.role === 'farmer') navigate('/farmer');
      else if (response.data.user.role === 'admin') navigate('/insights');
      else navigate('/marketplace');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (acc) => {
    setLoading(true);
    setError('');
    setForm({ email: acc.email, password: acc.pass });
    try {
      const response = await axios.post('/api/auth/login', {
        email: acc.email,
        password: acc.pass,
      });
      login(response.data.user, response.data.token);
      if (acc.role === 'farmer') navigate('/farmer');
      else if (acc.role === 'admin') navigate('/insights');
      else navigate('/marketplace');
    } catch (err) {
      setError('Demo login failed. Server might be initializing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-white p-8 sm:p-10 shadow-glow border border-slate-200/80">
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <img
            src="/images/logo.png"
            alt="Arab's AgroTech Hub logo"
            className="h-12 w-12 rounded-full object-cover ring-2 ring-agrolime/40"
          />
          <div>
            <h1 className="text-2xl font-black text-slate-900">Sign in to AgroTech Hub</h1>
            <p className="text-xs text-slate-500">Access farmer tools, checkout, and platform telemetry.</p>
          </div>
        </div>

        {/* 1-Click Demo Accounts */}
        <div className="mt-6 rounded-3xl bg-slate-50 p-4 border border-slate-200/70">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Quick 1-Click Demo Sign-In
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleDemoLogin(acc)}
                className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-agrolime hover:shadow-sm text-left transition"
              >
                <span className="text-lg">{acc.icon}</span>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-800 truncate">{acc.title.split(' ')[0]}</p>
                  <p className="text-[10px] text-agrolime capitalize font-medium">{acc.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="e.g. amina@example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-agrolime py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 rounded-2xl bg-emerald-50/60 p-4 text-xs text-emerald-900 border border-emerald-100 flex items-center justify-between">
          <span>Don't have an account yet?</span>
          <Link to="/register" className="font-bold text-agrolime hover:underline">
            Register now →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;

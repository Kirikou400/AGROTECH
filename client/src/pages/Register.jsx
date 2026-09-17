import { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'farmer' ? 'farmer' : 'buyer';
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: initialRole,
    location: '',
    phone: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/register', form);
      login(response.data.user, response.data.token);
      if (form.role === 'farmer') navigate('/farmer');
      else navigate('/marketplace');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
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
            <h1 className="text-2xl font-black text-slate-900">Create Your Account</h1>
            <p className="text-xs text-slate-500">Join Arab's AgroTech Hub agricultural trade network.</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mt-6 rounded-3xl border border-slate-200/90 bg-slate-50/80 p-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Choose Your Platform Role
          </label>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: 'farmer' })}
              className={`rounded-2xl border p-3 text-left transition flex items-start gap-2.5 ${
                form.role === 'farmer'
                  ? 'border-agrolime bg-white ring-2 ring-agrolime/20 shadow-sm'
                  : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
              }`}
            >
              <span className="text-xl">🌾</span>
              <div>
                <p className={`text-xs font-bold ${form.role === 'farmer' ? 'text-agrolime' : 'text-slate-900'}`}>
                  Farmer / Producer
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  List harvest crops, set prices & reach commercial buyers.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setForm({ ...form, role: 'buyer' })}
              className={`rounded-2xl border p-3 text-left transition flex items-start gap-2.5 ${
                form.role === 'buyer'
                  ? 'border-agrolime bg-white ring-2 ring-agrolime/20 shadow-sm'
                  : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
              }`}
            >
              <span className="text-xl">🛒</span>
              <div>
                <p className={`text-xs font-bold ${form.role === 'buyer' ? 'text-agrolime' : 'text-slate-900'}`}>
                  Commercial Buyer
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Procure verified produce in bulk with escrow payment safety.
                </p>
              </div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name / Contact Person</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Amina Bello"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="e.g. amina@example.com"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Secure Password</label>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">State / Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Kano, Lagos"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. 08012345678"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              />
            </div>
          </div>

          {form.role === 'farmer' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Farm / Cooperative Name (Optional)</label>
              <input
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. GreenHarvest Agribusiness Ltd"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-slate-800 bg-slate-50/50 focus:border-agrolime focus:ring-1 focus:ring-agrolime"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-agrolime py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
          >
            {loading ? 'Creating Account...' : `Register as ${form.role === 'farmer' ? 'Farmer' : 'Buyer'}`}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-agrolime hover:underline">
            Sign in here →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;

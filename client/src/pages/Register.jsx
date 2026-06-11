import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'farmer' ? 'farmer' : 'buyer';
  const [form, setForm] = useState({ name: '', email: '', password: '', role: defaultRole, location: '' });
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', form);
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-white p-10 shadow-glow">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Arab's AgroTech Hub logo" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Create an account</h1>
            <p className="text-sm text-slate-500">Register as a farmer or buyer to join Arab's AgroTech Hub.</p>
          </div>
        </div>
        <div className="mt-5 rounded-[32px] border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-700">Account type</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: 'farmer' })}
              className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${form.role === 'farmer' ? 'border-agrolime bg-agrolime text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}`}>
              Farmer
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: 'buyer' })}
              className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${form.role === 'buyer' ? 'border-agrolime bg-agrolime text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}`}>
              Buyer
            </button>
          </div>
          <p className="mt-4 text-sm text-slate-500">Select whether you want to join as a buyer or farmer before completing registration.</p>
        </div>
        {error && <div className="mt-6 rounded-3xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div>}
        <form onSubmit={submit} className="mt-6 space-y-5">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full rounded-3xl border border-slate-200 px-4 py-4" required />
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email" className="w-full rounded-3xl border border-slate-200 px-4 py-4" required />
          <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" placeholder="Password" className="w-full rounded-3xl border border-slate-200 px-4 py-4" required />
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" className="rounded-3xl border border-slate-200 px-4 py-4" />
          <button type="submit" className="w-full rounded-full bg-agrolime px-6 py-4 text-sm font-semibold text-white">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;

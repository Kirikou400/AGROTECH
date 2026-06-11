import { useEffect, useState } from 'react';
import axios from 'axios';
import AnalyticsChart from '../components/AnalyticsChart';

const AdminInsights = () => {
  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState('');

  const loadInsights = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard');
      setDashboard(response.data);
    } catch (error) {
      setMessage('Please sign in as admin to view analytics.');
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[36px] bg-white p-8 shadow-glow">
        <h1 className="text-3xl font-semibold text-slate-900">Admin analytics</h1>
        <p className="mt-3 text-slate-600">Demand, pricing trends, farmer participation and logistics performance.</p>
        {message && <p className="mt-6 rounded-3xl bg-amber-50 p-4 text-sm text-amber-700">{message}</p>}
        {dashboard && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">Total product listings</p>
              <p className="mt-3 text-3xl font-semibold text-agrolime">{dashboard.totalProducts}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">Active orders</p>
              <p className="mt-3 text-3xl font-semibold text-agrogold">{dashboard.activeOrders}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <p className="text-sm text-slate-500">Paid orders</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-700">{dashboard.paidOrders}</p>
            </div>
          </div>
        )}
        {dashboard?.summary && (
          <div className="mt-10 rounded-3xl border border-slate-200 p-6">
            <AnalyticsChart summary={dashboard.summary} />
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminInsights;

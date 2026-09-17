import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import AnalyticsChart from '../components/AnalyticsChart';

const AdminInsights = () => {
  const { user, token, login } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadInsights = async () => {
    if (!token) {
      setMessage('Admin authentication required. Please sign in with an admin account.');
      setDashboard(null);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboard(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Please sign in as admin to view analytics.');
      setDashboard(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, [token]);

  const handleDemoAdminLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/login', {
        email: 'tunde@example.com',
        password: 'admin123',
      });
      login(res.data.user, res.data.token);
    } catch (err) {
      setMessage('Failed to sign in as demo admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 rounded-[36px] bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-500/20 text-purple-300 border border-purple-400/30">
              Platform Intelligence
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Executive Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl">
              Real-time telemetry on Nigerian crop demand, price fluctuations, verified farmer participation, and logistics fulfillment.
            </p>
          </div>

          {user?.role !== 'admin' && (
            <button
              onClick={handleDemoAdminLogin}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 hover:bg-purple-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>1-Click Admin Sign-In (Tunde)</span>
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={handleDemoAdminLogin}
            className="rounded-full bg-amber-600 hover:bg-amber-700 px-4 py-2 text-xs font-bold text-white transition self-start sm:self-auto"
          >
            Switch to Admin Demo
          </button>
        </div>
      )}

      {loading && (
        <div className="rounded-[36px] bg-white p-12 text-center text-slate-500 shadow-glow">
          <svg className="animate-spin mx-auto h-8 w-8 text-agrolime mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          <p className="text-sm font-medium">Gathering platform telemetry...</p>
        </div>
      )}

      {dashboard && (
        <div className="space-y-8">
          {/* Top Metrics Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Produce Items</p>
                <span className="p-2 rounded-2xl bg-emerald-50 text-emerald-600">📦</span>
              </div>
              <p className="mt-3 text-3xl font-black text-slate-900">{dashboard.totalProducts}</p>
              <p className="mt-1 text-xs text-emerald-600 font-medium">Active marketplace listings</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Orders</p>
                <span className="p-2 rounded-2xl bg-amber-50 text-amber-600">⏳</span>
              </div>
              <p className="mt-3 text-3xl font-black text-agrogold">{dashboard.activeOrders}</p>
              <p className="mt-1 text-xs text-amber-600 font-medium">In transit & pending dispatch</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Settled & Paid</p>
                <span className="p-2 rounded-2xl bg-purple-50 text-purple-600">💳</span>
              </div>
              <p className="mt-3 text-3xl font-black text-purple-700">{dashboard.paidOrders}</p>
              <p className="mt-1 text-xs text-purple-600 font-medium">Escrow verified orders</p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Registered Users</p>
                <span className="p-2 rounded-2xl bg-blue-50 text-blue-600">👥</span>
              </div>
              <p className="mt-3 text-3xl font-black text-blue-700">995+</p>
              <p className="mt-1 text-xs text-blue-600 font-medium">Across all geopolitical zones</p>
            </div>
          </div>

          {/* Trend Chart & KPI Breakdown */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[36px] bg-white p-8 shadow-glow lg:col-span-2 border border-slate-200/80">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Marketplace Growth Metrics</h3>
                  <p className="text-xs text-slate-500 mt-1">Comparative growth indices and demand volume</p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-full">
                  Live Feed
                </span>
              </div>
              {dashboard?.summary ? (
                <AnalyticsChart summary={dashboard.summary} />
              ) : (
                <p className="text-slate-400">No chart telemetry available.</p>
              )}
            </div>

            <div className="rounded-[36px] bg-white p-8 shadow-glow border border-slate-200/80 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Key Performance Indicators</h3>
              <p className="text-xs text-slate-500">Live operational targets</p>
              <div className="space-y-3 pt-2">
                {dashboard?.summary?.map((item) => (
                  <div key={item.metric} className="p-3.5 rounded-2xl bg-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-700">{item.metric}</p>
                      <p className="text-base font-bold text-slate-900 mt-0.5">
                        {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      item.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {item.trend === 'up' ? '↑ Rising' : '→ Stable'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders in System */}
          {dashboard.recentOrders && dashboard.recentOrders.length > 0 && (
            <div className="rounded-[36px] bg-white p-8 shadow-glow border border-slate-200/80">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Platform Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Buyer</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Delivery</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dashboard.recentOrders.map((order) => (
                      <tr key={order._id || order.id} className="hover:bg-slate-50/80">
                        <td className="py-3 font-mono font-medium text-xs text-slate-600">
                          {order._id || order.id}
                        </td>
                        <td className="py-3 font-medium text-slate-900">
                          {order.buyerName || 'Demo Buyer'}
                        </td>
                        <td className="py-3 text-slate-600">
                          {order.items?.length || 1} crops
                        </td>
                        <td className="py-3 capitalize text-slate-600">
                          {order.deliveryOption}
                        </td>
                        <td className="py-3 font-bold text-slate-900">
                          ₦{(Number(order.total) || 0).toLocaleString()}
                        </td>
                        <td className="py-3">
                          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 uppercase">
                            {order.paymentStatus || 'paid'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default AdminInsights;

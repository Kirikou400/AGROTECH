import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const links = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/farmer', label: 'Farmer Hub' },
  { to: '/community', label: 'Community' },
  { to: '/services', label: 'Business Support' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'News' },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 text-lg font-bold text-agrolime">
            <img src="/images/logo.png" alt="Arab's AgroTech Hub logo" className="h-12 w-12 rounded-full object-cover ring-2 ring-agrolime/30" />
            <div className="leading-tight">
              <div className="text-base font-semibold">Arab's AgroTech Hub</div>
              <div className="text-xs font-medium text-slate-500">-Connecting Farmers To The Future-</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-700">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'text-agrolime' : 'hover:text-agrogold'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-700">Hi, {user.name}</span>
                <button onClick={logout} className="rounded-full border border-agrolime px-4 py-2 text-sm text-agrolime transition hover:bg-agrolime hover:text-white">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="rounded-full border border-agrolime bg-white px-4 py-2 text-sm font-semibold text-agrolime transition hover:bg-emerald-50" to="/register">
                  Sign up
                </Link>
                <Link className="rounded-full bg-agrolime px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600" to="/login">
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

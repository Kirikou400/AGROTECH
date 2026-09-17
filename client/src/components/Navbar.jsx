
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

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
  const { itemCount } = useContext(CartContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">
          {/* Brand Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="Arab's AgroTech Hub logo"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-agrolime/30 transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <div className="text-base font-bold text-slate-900 group-hover:text-agrolime transition-colors">
                Arab's AgroTech Hub
              </div>
              <div className="text-[11px] font-medium tracking-wide text-agrolime">
                Connecting Farmers To The Future
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `transition-colors py-1 relative ${
                    isActive
                      ? 'text-agrolime font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-agrolime after:rounded-full'
                      : 'hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  `text-xs px-2.5 py-1 rounded-full font-semibold transition ${
                    isActive ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`
                }
              >
                Admin Insights
              </NavLink>
            )}
          </nav>

          {/* Right Actions: Cart & Auth */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/checkout"
              onClick={closeMenu}
              className="relative p-2 text-slate-700 hover:text-agrolime rounded-full hover:bg-slate-100 transition-colors"
              aria-label="View shopping cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-agrogold px-1.5 text-[11px] font-bold text-white shadow-sm animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Auth Buttons */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-[11px]">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="font-medium max-w-[100px] truncate">{user.name}</span>
                  <span className="rounded-full bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="rounded-full border border-slate-300 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  className="rounded-full border border-agrolime bg-white px-3.5 py-1.5 text-xs font-semibold text-agrolime transition hover:bg-emerald-50"
                  to="/register"
                >
                  Sign up
                </Link>
                <Link
                  className="rounded-full bg-agrolime px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  to="/login"
                >
                  Sign in
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-fadeIn">
          {user && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 text-slate-800">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-emerald-800 capitalize font-medium">{user.role} Account · {user.location || 'Nigeria'}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition ${
                    isActive ? 'bg-agrolime text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === 'admin' && (
              <NavLink
                to="/insights"
                onClick={closeMenu}
                className="px-3 py-2 rounded-xl text-sm font-medium bg-purple-100 text-purple-900"
              >
                Admin Insights
              </NavLink>
            )}
            <NavLink
              to="/checkout"
              onClick={closeMenu}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>Shopping Cart</span>
              {itemCount > 0 && (
                <span className="rounded-full bg-agrogold px-2 py-0.5 text-xs font-bold text-white">
                  {itemCount} items
                </span>
              )}
            </NavLink>
          </nav>

          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full text-center rounded-full border border-rose-200 bg-rose-50 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-100"
              >
                Sign out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full text-center rounded-full bg-agrolime py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full text-center rounded-full border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

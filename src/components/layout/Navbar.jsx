import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/auth/authSlice";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const watchList = useSelector((state) => state.watchList.watchList);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSearchPage = pathname.startsWith("/search");

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Movies", path: "/movies", icon: "🎬" },
    { name: "Series", path: "/series", icon: "📺" },
    { name: "Watchlist", path: "/watchlist", icon: "📋" },
  ];

  return (
    <nav className="bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50 sticky top-0 z-[100] px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* 1. Logo */}
        <Link to="/home" className="flex items-center gap-2 z-[110]">
          <div className="relative w-9 h-9 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-lg">🎬</span>
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-zinc-950" />
          </div>

          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-white font-black text-base tracking-tight uppercase">
              Movie
            </span>
            <span className="text-blue-500 font-black text-base tracking-tight uppercase">
              Night
            </span>
          </div>
        </Link>

        {/* 2. Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/40 p-1 rounded-2xl border border-zinc-800/50">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`
              }
            >
              {link.name}
              {link.name === "Watchlist" && watchList.length > 0 && (
                <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {watchList.length}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* 3. Search & User Actions */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          {/* Search button (always visible, replaces input on small screens) */}
          {isAuthenticated && !isSearchPage && (
            <button
              onClick={() => navigate("/search")}
              className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
              title="Search"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          )}

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-zinc-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all hidden sm:block"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-zinc-900/80 p-1 pr-3 rounded-2xl border border-zinc-800">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 rounded-lg transition-colors"
                title="Logout"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* 4. Burger Button (Mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl border border-zinc-800 z-[110]"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* 5. Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-zinc-950/95 backdrop-blur-2xl z-[100] md:hidden flex flex-col pt-24 px-8 gap-6 transition-all duration-500 ${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        {/* Mobile Search */}
        {isAuthenticated && (
          <button
            onClick={() => {
              navigate("/search");
              setIsMenuOpen(false);
            }}
            className="w-full bg-zinc-900 border border-zinc-800 py-4 pl-12 rounded-2xl text-zinc-500 text-left relative"
          >
            <svg
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search movies & shows...
          </button>
        )}

        {/* Mobile Links */}
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `text-xl font-bold p-4 rounded-2xl transition-all flex items-center gap-3 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-500 hover:text-white bg-zinc-900/50"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
              {link.name === "Watchlist" && watchList.length > 0 && (
                <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                  {watchList.length}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Logout */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="mt-auto mb-12 p-4 rounded-2xl bg-red-500/10 text-red-400 font-bold text-lg transition-all flex items-center gap-3 border border-red-500/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

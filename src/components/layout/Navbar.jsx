import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/auth/authSlice";
import { useState, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import ConfirmModal from "@/components/ui/ConfirmModal";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const watchList = useSelector((state) => state.watchList.watchList);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSearchPage = pathname.startsWith("/search");
  const menuRef = useRef(null);

  useClickOutside(menuRef, (e) => {
    if (e.target.closest('#burger-button')) return;
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const confirmLogout = async () => {
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
    <nav className="bg-[#0f0f11] border-b border-white/5 sticky top-0 z-[100] px-4 md:px-8 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* 1. Logo (Left) */}
        <Link to="/home" className="flex items-center gap-3 z-[110] flex-shrink-0">
          <div className="relative w-10 h-10 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white font-bold text-xl">
              M
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-[3px] border-[#0f0f11]" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-white font-black text-lg tracking-tight uppercase">
              Movie
            </span>
            <span className="text-blue-500 font-black text-lg tracking-tight uppercase">
              Night
            </span>
          </div>
        </Link>

        {/* 2. Search Bar (Center - PC) */}
        {isAuthenticated && !isSearchPage && (
          <div className="hidden lg:flex flex-1 max-w-xl mx-auto items-center relative group">
            <svg
              className="w-5 h-5 absolute left-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search movies, TV shows, anime..."
              onClick={() => navigate("/search")}
              readOnly // It redirects to search page on click
              className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 rounded-2xl py-2.5 pl-12 pr-4 text-sm text-zinc-300 placeholder:text-zinc-500 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 cursor-text shadow-inner"
            />
          </div>
        )}

        {/* 3. Navigation & Actions (Right) */}
        <div className="flex items-center gap-3 lg:gap-5 flex-shrink-0">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`
                }
              >
                {link.name}
                {link.name === "Watchlist" && watchList.length > 0 && (
                  <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shadow-lg shadow-blue-500/20">
                    {watchList.length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Search Button (Mobile/Tablet only) */}
          {isAuthenticated && !isSearchPage && (
            <button
              onClick={() => navigate("/search")}
              className="lg:hidden p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}

          {/* User / Auth */}
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
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3 bg-zinc-900/60 p-1.5 pr-4 rounded-2xl border border-zinc-800/80 backdrop-blur-md">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-inner">
                {user?.email?.[0]?.toUpperCase() || "?"}
              </div>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="text-zinc-400 hover:text-red-400 text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                Logout
              </button>
            </div>
          )}

          {/* Burger Button (Mobile) */}
          <button
            id="burger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 text-zinc-400 hover:text-white bg-zinc-900/80 rounded-xl border border-zinc-800 z-[110]"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current rounded-full transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0f0f11] z-[100] md:hidden flex flex-col pt-24 px-6 gap-6 transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div ref={menuRef} className="flex flex-col h-full">
          {/* Mobile Search */}
          {isAuthenticated && (
            <button
              onClick={() => {
                navigate("/search");
                setIsMenuOpen(false);
              }}
              className="w-full bg-zinc-900/80 border border-zinc-800 py-4 pl-12 rounded-2xl text-zinc-400 text-left relative shadow-inner mb-4"
            >
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                  `text-lg font-bold p-4 rounded-2xl transition-all flex items-center gap-4 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-zinc-400 hover:text-white bg-zinc-900/50 border border-white/5"
                  }`
                }
              >
                <span className="text-xl">{link.icon}</span>
                {link.name}
                {link.name === "Watchlist" && watchList.length > 0 && (
                  <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                    {watchList.length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Logout */}
          {isAuthenticated && (
            <div className="mt-auto mb-8 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-xl flex items-center justify-center text-white font-bold">
                  {user?.email?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm text-zinc-400 truncate">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="w-full p-4 rounded-2xl bg-red-500/10 text-red-400 font-bold text-lg transition-all flex items-center justify-center gap-2 border border-red-500/20 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Log Out"
        message="Are you sure you want to log out of your account?"
        confirmText="Log Out"
      />
    </nav>
  );
};

export default Navbar;

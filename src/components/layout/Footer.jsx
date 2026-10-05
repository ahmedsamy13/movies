import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <Link to="/home" className="flex items-center gap-2">
            <div className="relative w-9 h-9 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-lg">🎬</span>
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-zinc-950" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-base tracking-tight uppercase">
                Movie
              </span>
              <span className="text-blue-500 font-black text-base tracking-tight uppercase">
                Night
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/movies"
              className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Movies
            </Link>
            <Link
              to="/series"
              className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Series
            </Link>
            <Link
              to="/search"
              className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Search
            </Link>
            <Link
              to="/watchlist"
              className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Watchlist
            </Link>
          </div>

          {/* Copyrights */}
          <div className="text-gray-500 text-xs">
            © {currentYear} smsm. All rights reserved.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            Powered by Simkl API
          </p>
          <p className="text-[10px] text-zinc-700">
            Built with React, Redux & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

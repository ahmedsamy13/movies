import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <Link to="/home" className="flex items-center gap-2 z-[110]">
            <div className="relative w-9 h-9 flex-shrink-0">
              {/* Icon */}
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-lg">🎬</span>
              </div>
              {/* Dot */}
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

          {/* Navigation Links */}

          {/* Copyrights */}
          <div className="text-gray-500 text-xs">
            © {new Date().getFullYear()} smsm. All rights reserved.
          </div>
        </div>

        {/* Social Icons (Optional) */}
        <div className="mt-8 pt-8 border-t border-zinc-900/50 flex justify-center gap-4 text-gray-500">
          <p className="text-[10px] uppercase tracking-widest">
            Powered by Simkl API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

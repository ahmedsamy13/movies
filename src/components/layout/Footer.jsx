import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">
              S
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase">
              Simkl<span className="text-blue-500">Clone</span>
            </span>
          </div>

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

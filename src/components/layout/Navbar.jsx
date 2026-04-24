import { NavLink } from "react-router-dom";

const Navbar = () => {
  // كلاسات التنسيق للرابط العادي والنشط
  const linkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-300 ${
      isActive
        ? "text-blue-500 border-b-2 border-blue-500 pb-1"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* اللوجو */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            S
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            Simkl<span className="text-blue-500">Clone</span>
          </span>
        </div>

        {/* الروابط */}
        <div className="flex items-center gap-8">
          <NavLink to="/home" className={linkStyles}>
            Home
          </NavLink>

          <NavLink to="/movies" className={linkStyles}>
            Movies
          </NavLink>

          {/* يمكنك إضافة روابط إضافية هنا */}
          <NavLink to="/login" className={linkStyles}>
            Login
          </NavLink>
        </div>

        {/* زر بحث بسيط أو بروفايل */}
        <div className="hidden md:flex items-center bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
          <span className="text-gray-500 text-xs">Search...</span>
          <kbd className="ml-2 bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] text-gray-400">
            Ctrl K
          </kbd>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

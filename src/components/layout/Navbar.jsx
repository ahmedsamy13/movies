import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/auth/authSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* 1. اللوجو */}
        <Link className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            S
          </div>
          <span className="text-xl font-black tracking-tighter text-white uppercase">
            Simkl<span className="text-blue-500">Clone</span>
          </span>
        </Link>

        {/* 2. الروابط */}
        <div className="hidden md:flex items-center justify-center gap-8 flex-1">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/tvs"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white"
            }
          >
            TVs
          </NavLink>
        </div>

        {/* 3. اليوزر أو اللوجين (اليمين خالص) */}
        <div className="flex items-center justify-end gap-4 flex-1">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
            >
              Login
            </NavLink>
          ) : (
            <div className="flex items-center gap-4">
              {/* عرض اسم اليوزر (أو أول جزء من الإيميل لو مفيش اسم) */}
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500 font-medium">
                  Welcome back,
                </span>
                <span className="text-sm font-bold text-white">
                  {user?.user_metadata?.full_name || user?.email?.split("@")[0]}
                </span>
              </div>

              {/* زرار الخروج بشكل أيقونة أو زرار صغير */}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                title="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

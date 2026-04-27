import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // جلب الحالة من Redux
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    // إرسال البيانات للـ Thunk اللي بيكلم Supabase
    const result = await dispatch(loginUser({ email, password }));

    // لو العملية نجحت (fulfilled)
    if (loginUser.fulfilled.match(result)) {
      navigate("/home"); // أو /movies حسب المسار عندك
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-zinc-800 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Sign In</h1>
          <p className="text-gray-400 text-sm mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        {/* عرض رسالة الخطأ من Supabase لو موجودة */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-medium animate-shake">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            disabled={isLoading}
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition-all disabled:opacity-50"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition-all disabled:opacity-50"
            required
          />
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold mt-8 transition-all shadow-lg shadow-blue-900/20 disabled:bg-zinc-700 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline font-bold transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </form>
    </div>
  );
}

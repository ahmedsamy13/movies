import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "@/features/auth/authSlice";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // إرسال البيانات للـ Thunk
    // لاحظ: بنمرر الـ fullName كـ metadata عشان سوبابيز يحفظه
    const result = await dispatch(
      signUpUser({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      }),
    );

    if (signUpUser.fulfilled.match(result)) {
      // لو عامل إيقاف لتأكيد الإيميل في سوبابيز، هيدخله علطول
      // لو مش عامله، يفضل تظهر رسالة "Check your email"
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md border border-zinc-800 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white">Create Account</h1>
          <p className="text-gray-400 text-sm mt-2">
            Join us to start tracking your favorite movies
          </p>
        </div>

        {/* عرض الخطأ إن وجد */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition disabled:opacity-50"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition disabled:opacity-50"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition disabled:opacity-50"
            required
          />

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 mt-4 disabled:bg-zinc-700 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-bold transition-colors"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

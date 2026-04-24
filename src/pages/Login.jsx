import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login by storing dummy data
    localStorage.setItem("user", JSON.stringify({ email, name: "User" }));
    navigate("/home");
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

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition-all"
            required
          />
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold mt-8 transition-all shadow-lg shadow-blue-900/20">
          Login
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

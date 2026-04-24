import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulate account creation and redirect to login
    navigate("/login");
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

        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 bg-zinc-800 rounded-xl text-white border border-transparent focus:border-blue-600 outline-none transition"
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 mt-4">
            Sign Up
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

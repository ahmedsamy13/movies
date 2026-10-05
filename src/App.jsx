import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import SignUp from "./pages/SignUp";
import TVs from "./pages/TVs";
import TV from "./pages/TV";
import WatchList from "./pages/WatchList";
import Search from "./pages/Search";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSession } from "./features/auth/authSlice";
import { supabase } from "./services/supabase";
import { Link } from "react-router-dom";

// 404 Page Component
function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 mb-6">
        <span className="text-5xl">🔍</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
        404
      </h1>
      <p className="text-zinc-400 text-lg mb-2">Page not found</p>
      <p className="text-zinc-600 text-sm mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/home"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"
      >
        Go Home
      </Link>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "movies", element: <Movies /> },
          { path: "movies/:movieId", element: <Movie /> },
          { path: "series", element: <TVs /> },
          { path: "series/:serieId", element: <TV /> },
          { path: "watchlist", element: <WatchList /> },
          { path: "search", element: <Search /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      dispatch(setSession(data.session?.user || null));
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session?.user || null));
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;

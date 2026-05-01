import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
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
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

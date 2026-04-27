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

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // 1. مسارات عامة (Public) - متاحة للكل
      {
        index: true, // دي بتخلي الهوم هي الصفحة الافتراضية أول ما يفتح الموقع "/"
        element: <Home />,
      },
      {
        path: "home", // اختياري لو عايز "/home" تشتغل برضو
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },

      // 2. مسارات محمية (Protected) - لازم تسجيل دخول
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "movies",
            element: <Movies />,
          },
          {
            path: "movies/:movieId",
            element: <Movie />,
          },
          {
            path: "/tvs",
            element: <TVs />,
          },
          {
            path: "/tvs/:tvId",
            element: <TV />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
